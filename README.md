# InMemory Web

Une application web moderne construite avec Next.js 14, React 18, et Tailwind CSS pour afficher et gérer une grille de ressources.

## 🚀 Technologies Utilisées

- **Next.js 14.2.28** - Framework React avec rendu côté serveur
- **React & React DOM 18.2.0** - Bibliothèque UI
- **Tailwind CSS 3.4.1** - Framework CSS utilitaire
- **TypeScript** - Typage statique
- **Police Geist** - Police système moderne

## 🛠 Installation

1. Cloner le repository
2. Installer les dépendances :
```bash
npm install
```
3. Lancer le serveur de développement :
```bash
npm run dev
```

## 📝 Points Techniques Importants

### Configuration de la Police Geist

La police Geist est configurée dans `src/app/layout.tsx` :
```typescript
import { GeistSans, GeistMono } from "geist/font";

const geistSans = GeistSans;
const geistMono = GeistMono;
```

### Structure des Composants

- `ResourceGrid` - Grille principale affichant les ressources
- `ResourceGridItem` - Carte individuelle pour chaque ressource
  - Taille maximale : 300px de large
  - Hauteur maximale : 140px
  - Tailles de police optimisées pour la lisibilité

### Données Mock

Les données de test sont importées depuis `./data/mockData` et incluent :
- Resources
- Teams
- Votes
- Comments

### Thème et Style

- Fond blanc (`bg-white`)
- Police système Geist pour une meilleure lisibilité
- Design responsive et moderne
- Composants optimisés pour les performances

## 🔍 Points d'Attention

1. Toujours utiliser les variables de police Geist :
   ```typescript
   className={`${geistSans.variable} ${geistMono.variable}`}
   ```

2. Les cartes de ressources sont limitées en taille pour une meilleure expérience utilisateur

3. L'application utilise les dernières versions stables des dépendances pour éviter les problèmes de compatibilité

## 📦 Dépendances Principales

```json
{
  "next": "^14.2.28",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "geist": "latest"
}
```

## 🤝 Contribution

1. Créer une branche pour votre fonctionnalité
2. Commiter vos changements
3. Créer une Pull Request

## 📄 License

MIT
