import ResourceGrid from './components/resources/ResourceGrid';

// Données temporaires pour tester
const mockData = {
  resources: [
    {
      id: '1',
      title: 'Test Resource',
      url: 'https://example.com',
      description: 'Test description',
      createdAt: new Date(),
      author: {
        id: '1',
        name: 'Test User',
        teams: []
      }
    }
  ],
  teams: [
    {
      id: '1',
      name: 'Team 1',
      color: '#FF0000',
      members: []
    }
  ],
  votes: {},
  comments: {}
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <ResourceGrid 
        resources={mockData.resources}
        teams={mockData.teams}
        votes={mockData.votes}
        comments={mockData.comments}
      />
    </main>
  );
}
