import { Resource, Team, Vote, Comment } from '@/app/types';
import ResourceCard from './ResourceCard';

interface ResourceGridProps {
  resources: Resource[];
  teams: Team[];
  votes: { [resourceId: string]: { [teamId: string]: Vote[] } };
  comments: { [resourceId: string]: Comment[] };
}

export default function ResourceGrid({ resources, teams, votes, comments }: ResourceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {resources.map(resource => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          teams={teams}
          votes={votes[resource.id] || {}}
          comments={comments[resource.id] || []}
        />
      ))}
    </div>
  );
} 