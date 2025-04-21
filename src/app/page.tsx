'use client';

import { useEffect, useState } from 'react';
import ResourceGrid from './components/resources/ResourceGrid';
import { Resource, Category } from './types';

export default function Home() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    console.log("=== DÉBUT DU CHARGEMENT ===");
    console.log("Variables d'environnement :", {
      url: process.env.NEXT_PUBLIC_STRAPI_URL,
      username: process.env.NEXT_PUBLIC_STRAPI_USERNAME,
      hasPassword: !!process.env.NEXT_PUBLIC_STRAPI_PASSWORD
    });

    const fetchData = async () => {
      try {
        const strapiUrl = "http://localhost:1337";
        
        // Authentification via l'API publique
        const authBody = {
          identifier: "emmanuelle.roux@gmail.com",
          password: "ER4567ty#"
        };
        
        console.log("Données d'authentification complètes:", {
          url: `${strapiUrl}/api/auth/local`,
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: authBody
        });
        
        const authResponse = await fetch(`${strapiUrl}/api/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authBody),
        });

        console.log("Statut de la réponse d'authentification:", authResponse.status);
        const authData = await authResponse.json();
        
        if (!authResponse.ok) {
          console.error("Détails de l'erreur d'authentification:", authData);
          throw new Error(`Erreur lors de l'authentification: ${JSON.stringify(authData)}`);
        }

        console.log("Authentification réussie:", {
          status: authResponse.status,
          hasToken: !!authData.jwt,
          userId: authData.user?.id
        });
        
        const token = authData.jwt;

        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        // Récupérer les ressources
        console.log("Récupération des ressources...");
        const resourcesUrl = `${strapiUrl}/api/resources?pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`;
        console.log("URL des ressources:", resourcesUrl);
        
        const resourcesResponse = await fetch(resourcesUrl, { headers });
        console.log("Statut de la réponse des ressources:", resourcesResponse.status);
        
        if (!resourcesResponse.ok) {
          const resourceError = await resourcesResponse.json();
          console.error("Erreur lors de la récupération des ressources:", resourceError);
          throw new Error(`Erreur lors de la récupération des ressources: ${JSON.stringify(resourceError)}`);
        }
        
        const resourcesData = await resourcesResponse.json();
        console.log("Structure complète des ressources:", JSON.stringify(resourcesData.data[0], null, 2));
        console.log("Ressources reçues:", {
          count: resourcesData.data?.length,
          pagination: resourcesData.meta?.pagination
        });
        
        setResources(resourcesData.data);
        setTotalItems(resourcesData.meta?.pagination?.total || 0);

        // Récupérer les catégories
        console.log("Récupération des catégories...");
        const categoriesUrl = `${strapiUrl}/api/categories`;
        console.log("URL des catégories:", categoriesUrl);
        
        const categoriesResponse = await fetch(categoriesUrl, { headers });
        console.log("Statut de la réponse des catégories:", categoriesResponse.status);
        
        if (!categoriesResponse.ok) {
          const categoryError = await categoriesResponse.json();
          console.error("Erreur lors de la récupération des catégories:", categoryError);
          throw new Error(`Erreur lors de la récupération des catégories: ${JSON.stringify(categoryError)}`);
        }
        
        const categoriesData = await categoriesResponse.json();
        console.log("Catégories reçues:", {
          count: categoriesData.data?.length
        });
        
        setCategories(categoriesData.data);
        console.log("=== FIN DU CHARGEMENT RÉUSSI ===");
        setLoading(false);
      } catch (err) {
        console.error('=== ERREUR LORS DU CHARGEMENT ===');
        console.error('Détails de l\'erreur:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  if (loading) {
    console.log("Affichage du loader...");
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  if (error) {
    console.log("Affichage de l'erreur:", error);
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  console.log("Rendu de la grille avec:", {
    nombreRessources: resources.length,
    nombreCategories: categories.length
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <ResourceGrid resources={resources} />
    </div>
  );
}
