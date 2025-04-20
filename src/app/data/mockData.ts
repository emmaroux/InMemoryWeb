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
    title: 'Les meilleures pratiques en UI/UX',
    url: 'https://example.com/ui-ux',
    image: 'https://picsum.photos/400/300?random=1',
    description: 'Un guide complet sur les meilleures pratiques en design d\'interface utilisateur.',
    createdAt: new Date(),
    author: mockUsers[0],
  },
  {
    id: '2',
    title: 'Introduction à React 19',
    url: 'https://example.com/react19',
    image: 'https://picsum.photos/400/300?random=2',
    description: 'Découvrez les nouvelles fonctionnalités de React 19.',
    createdAt: new Date(),
    author: mockUsers[1],
  },
  {
    id: '3',
    title: 'Guide de sécurité web',
    url: 'https://example.com/security',
    image: 'https://picsum.photos/400/300?random=3',
    description: 'Les bonnes pratiques pour sécuriser vos applications web.',
    createdAt: new Date(),
    author: mockUsers[2],
  },
  {
    id: '4',
    title: 'Optimisation des performances',
    url: 'https://example.com/performance',
    image: 'https://picsum.photos/400/300?random=4',
    description: 'Comment améliorer les performances de votre application.',
    createdAt: new Date(),
    author: mockUsers[3],
  },
  {
    id: '5',
    title: 'Les tendances du web 2024',
    url: 'https://example.com/trends',
    image: 'https://picsum.photos/400/300?random=5',
    description: 'Les tendances à suivre dans le développement web en 2024.',
    createdAt: new Date(),
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