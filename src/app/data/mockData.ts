import { Resource, Team, Vote, Comment, User } from '../types';

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
};

const mockUsers: User[] = [
  { id: '1', name: 'Alice Martin', teams: [] },
  { id: '2', name: 'Bob Dupont', teams: [] },
  { id: '3', name: 'Claire Bernard', teams: [] },
  { id: '4', name: 'David Leroy', teams: [] },
  { id: '5', name: 'Emma Petit', teams: [] },
];

const mockTeams: Team[] = [
  { id: '1', name: 'Équipe Marketing', color: '#FF6B6B', members: [] },
  { id: '2', name: 'Équipe Dev', color: '#4ECDC4', members: [] },
  { id: '3', name: 'Équipe Design', color: '#45B7D1', members: [] },
];

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Introduction complète à l\'architecture hexagonale en TypeScript',
    description: 'Un guide approfondi sur l\'architecture hexagonale (ports & adapters) avec des exemples concrets en TypeScript. Découvrez comment structurer votre application pour la rendre plus maintenable, testable et indépendante des technologies externes. Inclut des patterns de conception et des cas d\'utilisation réels.',
    image: 'https://picsum.photos/seed/arch/800/600',
    url: 'https://example.com/archi-hexa',
    createdAt: new Date('2024-01-15'),
    author: mockUsers[0],
  },
  {
    id: '2',
    title: 'Les meilleures pratiques de performance React en 2024',
    description: 'Une analyse détaillée des techniques d\'optimisation des performances dans React, incluant l\'utilisation des hooks de performance, la gestion du rendu, les stratégies de code splitting et la mise en cache. Avec des benchmarks comparatifs et des outils de mesure recommandés.',
    image: 'https://picsum.photos/seed/react/800/600',
    url: 'https://example.com/react-perf',
    createdAt: new Date('2024-02-01'),
    author: mockUsers[1],
  },
  {
    id: '3',
    title: 'Guide complet du développement d\'API avec tRPC et Next.js',
    description: 'Explorez comment construire des API typesafe de bout en bout avec tRPC et Next.js. Ce guide couvre l\'installation, la configuration, les bonnes pratiques de sécurité, la gestion des erreurs, et l\'intégration avec des bases de données. Inclut également des stratégies de déploiement et de mise en cache.',
    image: 'https://picsum.photos/seed/trpc/800/600',
    url: 'https://example.com/trpc-guide',
    createdAt: new Date('2024-02-10'),
    author: mockUsers[2],
  },
  {
    id: '4',
    title: 'Mise en place d\'une CI/CD moderne avec GitHub Actions',
    description: 'Un tutoriel pas à pas pour configurer un pipeline CI/CD complet avec GitHub Actions. Découvrez comment automatiser vos tests, déploiements et revues de code. Inclut des exemples de configuration pour différents types de projets et des stratégies de déploiement avancées.',
    image: 'https://picsum.photos/seed/cicd/800/600',
    url: 'https://example.com/github-actions',
    createdAt: new Date('2024-02-15'),
    author: mockUsers[3],
  },
  {
    id: '5',
    title: 'State Management en 2024 : Au-delà de Redux',
    description: 'Une exploration approfondie des solutions modernes de gestion d\'état en React, comparant Zustand, Jotai, et TanStack Query. Analyse des cas d\'utilisation, des performances et de la complexité de chaque solution. Inclut des exemples de code et des patterns de conception recommandés.',
    image: 'https://picsum.photos/seed/state/800/600',
    url: 'https://example.com/state-management',
    createdAt: new Date('2024-02-20'),
    author: mockUsers[4],
  },
  {
    id: '6',
    title: 'Guide TypeScript avancé',
    url: 'https://example.com/typescript',
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Maîtrisez les concepts avancés de TypeScript.',
    createdAt: new Date(),
    author: mockUsers[0],
  },
  {
    id: '7',
    title: 'Architecture microservices',
    url: 'https://example.com/microservices',
    image: 'https://picsum.photos/400/300?random=7',
    description: 'Comment concevoir une architecture microservices efficace.',
    createdAt: new Date(),
    author: mockUsers[1],
  },
  {
    id: '8',
    title: 'DevOps pour les débutants',
    url: 'https://example.com/devops',
    image: 'https://picsum.photos/400/300?random=8',
    description: 'Introduction aux pratiques DevOps.',
    createdAt: new Date(),
    author: mockUsers[2],
  },
  {
    id: '9',
    title: 'Les bases de données NoSQL',
    url: 'https://example.com/nosql',
    image: 'https://picsum.photos/400/300?random=9',
    description: 'Comprendre et utiliser les bases de données NoSQL.',
    createdAt: new Date(),
    author: mockUsers[3],
  },
  {
    id: '10',
    title: 'API REST vs GraphQL',
    url: 'https://example.com/api',
    image: 'https://picsum.photos/400/300?random=10',
    description: 'Comparaison des approches API REST et GraphQL.',
    createdAt: new Date(),
    author: mockUsers[4],
  },
];

const mockVotes: { [resourceId: string]: { [teamId: string]: Vote[] } } = {};
const mockComments: { [resourceId: string]: Comment[] } = {};

// Générer des votes et commentaires aléatoires
mockResources.forEach(resource => {
  mockVotes[resource.id] = {};
  mockComments[resource.id] = [];

  mockTeams.forEach(team => {
    const voteCount = Math.floor(Math.random() * 10);
    mockVotes[resource.id][team.id] = Array(voteCount).fill(null).map((_, index) => ({
      id: `vote-${resource.id}-${team.id}-${index}`,
      resourceId: resource.id,
      teamId: team.id,
      userId: mockUsers[Math.floor(Math.random() * mockUsers.length)].id,
      value: 1,
    }));
  });

  // Générer 2-5 commentaires par ressource
  const commentCount = 2 + Math.floor(Math.random() * 4);
  for (let i = 0; i < commentCount; i++) {
    const author = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const team = mockTeams[Math.floor(Math.random() * mockTeams.length)];
    mockComments[resource.id].push({
      id: `comment-${resource.id}-${i}`,
      content: `Commentaire ${i + 1} sur la ressource "${resource.title}"`,
      resourceId: resource.id,
      author,
      team,
      createdAt: new Date(),
    });
  }
});

export const mockData = {
  resources: mockResources,
  teams: mockTeams,
  votes: mockVotes,
  comments: mockComments,
}; 