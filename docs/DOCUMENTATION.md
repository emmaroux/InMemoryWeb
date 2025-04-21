# InMemory Frontend

## Documentation Technique

### Contexte du Projet

InMemory est une plateforme collaborative permettant aux équipes de partager et d'organiser des ressources (articles, tutoriels, outils, etc.). Chaque équipe peut voter pour les ressources qu'elle trouve utiles et laisser des commentaires. L'objectif est de créer une base de connaissances partagée et organisée par les équipes.

### Architecture Technique

- Frontend : Next.js 14 avec TypeScript
- Backend : Strapi (API REST)
- Styles : Tailwind CSS

## Structure du Projet

```
.
├── src/                    # Code source
│   ├── app/               # Application Next.js
│   │   ├── components/    # Composants React
│   │   │   ├── resources/ # Composants liés aux ressources
│   │   │   └── ui/        # Composants UI réutilisables
│   │   ├── types/        # Types TypeScript
│   │   └── page.tsx      # Page principale
│   └── styles/           # Styles globaux
├── public/               # Fichiers statiques
├── docs/                # Documentation
├── .env.local           # Variables d'environnement locales
├── .env.example         # Exemple de variables d'environnement
├── package.json         # Dépendances
└── README.md           # Documentation rapide
```

## Types de Données

### Resource (Ressource)
```typescript
interface Resource {
  id: number;
  attributes: {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    category?: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    votes?: {
      data: StrapiEntity<Vote>[];
    };
    comments?: {
      data: StrapiEntity<Comment>[];
    };
  };
}
```

### Team (Équipe)
```typescript
interface Team {
  id: number;
  attributes: {
    name: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    users?: {
      data: StrapiEntity<User>[];
    };
    comments?: {
      data: StrapiEntity<Comment>[];
    };
    votes?: {
      data: StrapiEntity<Vote>[];
    };
  };
}
```

### Vote
```typescript
interface Vote {
  id: number;
  attributes: {
    value: number;
    createdAt: string;
    updatedAt: string;
    resource?: {
      data: StrapiEntity<Resource>;
    };
    team?: {
      data: StrapiEntity<Team>;
    };
    user?: {
      data: StrapiEntity<User>;
    };
  };
}
```

### Comment (Commentaire)
```typescript
interface Comment {
  id: number;
  attributes: {
    content: string;
    createdAt: string;
    updatedAt: string;
    resource?: {
      data: StrapiEntity<Resource>;
    };
    team?: {
      data: StrapiEntity<Team>;
    };
    user?: {
      data: StrapiEntity<User>;
    };
  };
}
```

### Category (Catégorie)
```typescript
interface Category {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    resources?: {
      data: StrapiEntity<Resource>[];
    };
  };
}
```

## Composants Principaux

### ResourceGrid
Grille affichant les ressources sous forme de cartes.
- Props :
  - `resources: Resource[]` : Liste des ressources à afficher

### ResourceGridItem
Carte individuelle pour une ressource.
- Props :
  - `resource: Resource` : Données de la ressource
  - `onClick: () => void` : Fonction appelée lors du clic

### ResourceModal
Modal affichant les détails d'une ressource.
- Props :
  - `resource: Resource` : Ressource à afficher en détail
  - `onClose: () => void` : Fonction de fermeture

## API Endpoints

### Authentification
```typescript
const authResponse = await fetch(`${strapiUrl}/api/auth/local`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    identifier: process.env.NEXT_PUBLIC_STRAPI_USERNAME,
    password: process.env.NEXT_PUBLIC_STRAPI_PASSWORD,
  }),
});
```

### Ressources
```typescript
// Liste des ressources avec pagination
GET /api/resources?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}

// Ressource unique
GET /api/resources/${id}?populate=*
```

### Catégories
```typescript
// Liste des catégories
GET /api/categories?populate=*
```

## Configuration

### Variables d'Environnement
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_USERNAME=your_username
NEXT_PUBLIC_STRAPI_PASSWORD=your_password
```

## Configuration des Utilisateurs dans Strapi

### Types d'Utilisateurs dans Strapi

Strapi distingue deux types d'utilisateurs différents :

1. **Les utilisateurs administrateurs** (Admin Users)
   - Accèdent à l'interface d'administration de Strapi
   - Ont des rôles comme : Super Admin, Editor, Author
   - Utilisent l'endpoint `/admin/login` pour s'authentifier
   - Ne doivent PAS être utilisés pour l'API publique

2. **Les utilisateurs de l'API** (API Users)
   - Utilisent l'application front-end
   - Ont des rôles comme : Authenticated, Public
   - Utilisent l'endpoint `/api/auth/local` pour s'authentifier
   - Sont les utilisateurs à créer pour l'application

### Configuration des Utilisateurs API

#### 1. Vérifier les Rôles API
Dans Settings > Users & Permissions Plugin > Roles, vous trouverez deux sections :

- Les rôles d'administration (Super Admin, Editor, Author)
- Les rôles d'API (Authenticated, Public)

#### 2. Configurer le Rôle "Authenticated"
1. Cliquer sur le rôle "Authenticated"
2. Activer les permissions nécessaires :
   - Resources : find, findOne
   - Categories : find, findOne
3. Sauvegarder les modifications

#### 3. Créer un Utilisateur API
1. Aller dans Content Manager > Collection Types > User
2. Cliquer sur "Create new entry"
3. Remplir les informations :
   - Username
   - Email
   - Password
4. Sauvegarder

#### 4. Configuration Front-end
Dans le fichier `.env.local` du projet Next.js, utiliser les credentials de l'utilisateur API créé :

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_USERNAME=votre_email@example.com
NEXT_PUBLIC_STRAPI_PASSWORD=votre_mot_de_passe
```

### Important
- Ne jamais utiliser le compte Super Admin pour l'authentification API
- Toujours créer un utilisateur API distinct pour l'application front-end
- Le rôle "Authenticated" est automatiquement attribué aux utilisateurs API créés

### Troubleshooting
Si vous recevez une erreur "Invalid identifier or password" :
1. Vérifier que vous utilisez bien les credentials d'un utilisateur API (pas admin)
2. Vérifier que l'endpoint utilisé est `/api/auth/local` (pas `/admin/login`)
3. Vérifier que les permissions sont correctement configurées pour le rôle "Authenticated"

## Gestion des Images

Les images des ressources sont gérées via l'URL directe (`imageUrl`). Assurez-vous que les URLs sont accessibles publiquement.

## Sécurité

- Les identifiants Strapi sont stockés dans les variables d'environnement
- L'authentification utilise JWT
- Les tokens sont stockés de manière sécurisée
- Les requêtes API utilisent HTTPS en production

## Performance

- Utilisation de Next.js pour le rendu côté serveur
- Optimisation des images via Next.js Image
- Mise en cache des requêtes API
- Pagination des ressources

## Tests

Pour lancer les tests :
```bash
npm run test
```

## Déploiement

1. Construire l'application :
```bash
npm run build
```

2. Démarrer en production :
```bash
npm run start
```

## Débogage et Configuration Initiale

### Vérification de l'Authentification
Pour tester l'authentification API manuellement :
```bash
curl -X POST http://localhost:1337/api/auth/local -H "Content-Type: application/json" -d '{
  "identifier": "votre_email@example.com",
  "password": "votre_mot_de_passe"
}'
```

Une réponse réussie contient un JWT et les informations utilisateur :
```json
{
  "jwt": "votre.jwt.token",
  "user": {
    "id": 1,
    "username": "username",
    "email": "email@example.com"
    // ...
  }
}
```

### Configuration Initiale des Données

Pour que l'application fonctionne correctement, il faut initialiser des données dans Strapi :

1. **Créer une Catégorie** :
   - Accéder à Content Manager > Categories
   - Cliquer sur "Create new entry"
   - Remplir :
     - name: Nom de la catégorie (ex: "Documentation")
   - Publier la catégorie

2. **Créer une Ressource** :
   - Accéder à Content Manager > Resources
   - Cliquer sur "Create new entry"
   - Remplir :
     - title: Titre de la ressource
     - description: Description détaillée
     - imageUrl: URL de l'image représentative
     - link: Lien vers la ressource
     - category: Sélectionner une catégorie créée précédemment
   - Publier la ressource

### Résolution des Problèmes Courants

1. **Message "Chargement..." persistant** :
   - Vérifier que Strapi est en cours d'exécution sur le port 1337
   - Vérifier les credentials dans `.env.local`
   - Vérifier qu'il existe des données dans Strapi (ressources et catégories)
   - Consulter les logs dans la console du navigateur

2. **Erreur "Invalid identifier or password"** :
   - Vérifier que vous utilisez l'email comme identifiant (pas le username)
   - Vérifier que l'utilisateur est bien un utilisateur API (pas un admin)
   - Vérifier les permissions du rôle "Authenticated"

3. **Aucune donnée affichée** :
   - Vérifier les permissions du rôle "Authenticated" pour Resources et Categories
   - Vérifier que les ressources et catégories sont publiées dans Strapi
   - Vérifier les relations entre les ressources et les catégories

### Commandes Utiles pour le Développement

```bash
# Vérifier l'état de l'API
curl http://localhost:1337/api/resources?populate=*

# Vérifier les catégories
curl http://localhost:1337/api/categories?populate=*

# Tester l'authentification
curl -X POST http://localhost:1337/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{"identifier":"email@example.com","password":"password"}'
```

## Contact

Pour toute question ou clarification, n'hésitez pas à contacter l'équipe frontend.
