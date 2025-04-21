'use client';

import { useEffect, useState } from 'react';
import ResourceGrid from './components/resources/ResourceGrid';
import { Resource, Category } from './types';

export default function Home() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingState, setLoadingState] = useState<string>('initial');
  const [resourcesError, setResourcesError] = useState<string | null>(null);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState('auth');
      try {
        const strapiUrl = "http://localhost:1337";
        
        // Authentification via l'API publique
        const authBody = {
          identifier: "emmanuelle.roux@gmail.com",
          password: "ER4567ty#"
        };

        const authResponse = await fetch(`${strapiUrl}/api/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authBody),
        });

        const authData = await authResponse.json();
        
        if (!authResponse.ok) {
          throw new Error(`Erreur lors de l'authentification: ${JSON.stringify(authData)}`);
        }

        const token = authData.jwt;
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        // Récupérer les ressources
        setLoadingState('resources');
        try {
          const resourcesUrl = `${strapiUrl}/api/resources?pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`;
          const resourcesResponse = await fetch(resourcesUrl, { headers });
          
          if (!resourcesResponse.ok) {
            const resourceError = await resourcesResponse.json();
            throw new Error(`Erreur lors de la récupération des ressources: ${JSON.stringify(resourceError)}`);
          }
          
          const resourcesData = await resourcesResponse.json();
          setResources(resourcesData.data || []);
          setTotalItems(resourcesData.meta?.pagination?.total || 0);
          setResourcesError(null);
        } catch (err) {
          setResourcesError(err instanceof Error ? err.message : 'Erreur lors de la récupération des ressources');
        }

        // Récupérer les catégories
        setLoadingState('categories');
        try {
          const categoriesUrl = `${strapiUrl}/api/categories?pagination[page]=1&pagination[pageSize]=100`;
          const categoriesResponse = await fetch(categoriesUrl, { headers });
          
          if (!categoriesResponse.ok) {
            const categoryError = await categoriesResponse.json();
            throw new Error(`Erreur lors de la récupération des catégories: ${JSON.stringify(categoryError)}`);
          }
          
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData.data);
          setCategoriesError(null);
        } catch (err) {
          setCategoriesError(err instanceof Error ? err.message : 'Erreur lors de la récupération des catégories');
        }

        setLoadingState('complete');
      } catch (err) {
        setResourcesError(err instanceof Error ? err.message : 'Erreur lors de l\'authentification');
        setCategoriesError(err instanceof Error ? err.message : 'Erreur lors de l\'authentification');
        setLoadingState('error');
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  if (loadingState !== 'complete' && loadingState !== 'error') {
    const loadingMessages = {
      initial: 'Initialisation...',
      auth: 'Authentification...',
      resources: 'Chargement des ressources...',
      categories: 'Chargement des catégories...'
    };

    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <div className="text-lg">{loadingMessages[loadingState as keyof typeof loadingMessages]}</div>
        <div className="flex space-x-2">
          {Object.keys(loadingMessages).map((state) => (
            <div
              key={state}
              className={`w-2 h-2 rounded-full ${
                state === loadingState ? 'bg-purple-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {resourcesError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Erreur lors du chargement des ressources
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{resourcesError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {categoriesError && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">
                Erreur lors du chargement des catégories
              </h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>{categoriesError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!resourcesError && resources.length > 0 && (
        <ResourceGrid resources={resources} />
      )}
    </div>
  );
}
