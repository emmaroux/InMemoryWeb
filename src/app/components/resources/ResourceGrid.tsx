'use client';

import { Resource, Team, Vote, Comment } from '@/app/types';
import { useState } from 'react';
import ResourceGridItem from './ResourceGridItem';
import ResourceModal from './ResourceModal';

interface ResourceGridProps {
  resources: Resource[];
  teams: Team[];
  votes: { [resourceId: string]: { [teamId: string]: Vote[] } };
  comments: { [resourceId: string]: Comment[] };
}

export default function ResourceGrid({ resources, teams, votes, comments }: ResourceGridProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {resources.map((resource) => (
          <ResourceGridItem
            key={resource.id}
            resource={resource}
            onClick={() => setSelectedResource(resource)}
          />
        ))}
      </div>

      {selectedResource && (
        <ResourceModal
          resource={selectedResource}
          teams={teams}
          votes={votes[selectedResource.id] || {}}
          comments={comments[selectedResource.id] || []}
          onClose={() => setSelectedResource(null)}
        />
      )}
    </div>
  );
} 