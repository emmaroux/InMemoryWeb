import ResourceGrid from './components/resources/ResourceGrid';
import { mockData } from './data/mockData';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 px-4 pt-12 pb-8">
          Ressources
        </h1>
        <ResourceGrid 
          resources={mockData.resources}
          teams={mockData.teams}
          votes={mockData.votes}
          comments={mockData.comments}
        />
      </div>
    </main>
  );
}
