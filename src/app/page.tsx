'use client';

import { useEffect, useState } from 'react';
import ResourceGrid from './components/resources/ResourceGrid';
import { Resource, Category, StrapiResponse } from './types';

export default function Home() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Log des variables d'environnement au démarrage
    console.log("Variables d'environnement :", {
      url: process.env.NEXT_PUBLIC_STRAPI_URL,
      username: process.env.NEXT_PUBLIC_STRAPI_USERNAME,
      hasPassword: !!process.env.NEXT_PUBLIC_STRAPI_PASSWORD
    });

    const fetchData = async () => {
      try {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
        
        // Authentification via l'API publique
        const authBody = {
          identifier: process.env.NEXT_PUBLIC_STRAPI_USERNAME,
          password: process.env.NEXT_PUBLIC_STRAPI_PASSWORD
        };
        
        console.log("Tentative de connexion avec:", {
          url: `${strapiUrl}/api/auth/local`,
          body: {
            identifier: process.env.NEXT_PUBLIC_STRAPI_USERNAME,
            password: "***********"  // On masque le mot de passe dans les logs
          }
        });
        
        const authResponse = await fetch(`${strapiUrl}/api/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authBody),
        });

        const authData = await authResponse.json();
        
        if (!authResponse.ok) {
          console.error("Détails de l'erreur:", authData);
          throw new Error(`Erreur lors de l'authentification: ${JSON.stringify(authData)}`);
        }

        console.log("Réponse d'authentification:", {
          status: authResponse.status,
          hasToken: !!authData.jwt,
          authData: authData // Ajout des données complètes pour le débogage
        });
        
        const token = authData.jwt;

        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        // Récupérer les ressources
        const resourcesResponse = await fetch(
          `${strapiUrl}/api/resources?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`,
          { headers }
        );
        if (!resourcesResponse.ok) {
          const resourceError = await resourcesResponse.json();
          throw new Error(`Erreur lors de la récupération des ressources: ${JSON.stringify(resourceError)}`);
        }
        const resourcesData: StrapiResponse<Resource[]> = await resourcesResponse.json();
        setResources(resourcesData.data);
        setTotalItems(resourcesData.meta?.pagination?.total || 0);

        // Récupérer les catégories
        const categoriesResponse = await fetch(`${strapiUrl}/api/categories?populate=*`, { headers });
        if (!categoriesResponse.ok) {
          const categoryError = await categoriesResponse.json();
          throw new Error(`Erreur lors de la récupération des catégories: ${JSON.stringify(categoryError)}`);
        }
        const categoriesData: StrapiResponse<Category[]> = await categoriesResponse.json();
        setCategories(categoriesData.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ResourceGrid resources={resources} />
    </div>
  );
}
