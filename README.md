# InMemory Web

Application web pour partager et voter sur des ressources de développement.

## Fonctionnalités

- Affichage des ressources en grille responsive
- Système de votes par équipe
- Commentaires sur les ressources
- Modal de détail pour chaque ressource

## Notes techniques

### Grid Layout

La grille de ressources utilise une combinaison de CSS Grid et de media queries pour assurer un affichage stable :

```tsx
// ResourceGrid.tsx
<div 
  className="grid gap-x-8 gap-y-16 sm:gap-x-12 lg:gap-x-16"
  style={{
    gridTemplateColumns: `repeat(${
      screenWidth < 640 ? 1 :
      screenWidth < 1024 ? 2 :
      screenWidth < 1440 ? 3 : 4
    }, minmax(0, 1fr))`
  }}
>
```

Points clés pour une grille stable :
- Utilisation de `screenWidth` avec `useEffect` pour détecter la largeur réelle
- Breakpoints adaptés aux tailles d'écran standard
- Espacement progressif selon la taille d'écran
- Conteneur centré avec largeur maximale

### Style des cartes

Les cartes suivent un design moderne inspiré d'Usbek & Rica :

```tsx
// ResourceGridItem.tsx
<article className="group cursor-pointer max-w-[400px]">
  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.2rem]">
    {/* Image ou placeholder */}
  </div>
  <div className="space-y-3">
    <h3 className="text-[1.4rem] font-extrabold">
      {/* Titre */}
    </h3>
    {/* Description et métadonnées */}
  </div>
</article>
```

Caractéristiques des cartes :
- Largeur maximale fixe de 400px
- Ratio d'image 16/10
- Coins arrondis prononcés (1.2rem)
- Typographie optimisée pour la lecture
- Espacement vertical généreux

## Installation

```bash
npm install
npm run dev
```

## Développement

### Structure du projet

```
src/
  app/
    components/
      resources/
        ResourceGrid.tsx     # Grille principale
        ResourceGridItem.tsx # Carte individuelle
        ResourceModal.tsx    # Modal de détail
    types/
      index.ts              # Types TypeScript
    page.tsx                # Page principale
```

### Commandes utiles

- `npm run dev` : Démarre le serveur de développement
- `npm run build` : Compile le projet
- `npm run start` : Démarre le serveur de production
