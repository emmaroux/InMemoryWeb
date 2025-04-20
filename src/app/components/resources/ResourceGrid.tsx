'use client';

import { Resource, Team, Vote, Comment } from '@/app/types';
import { useState, useEffect } from 'react';
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
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
      <div className="py-12">
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
          {resources.map((resource) => (
            <div key={resource.id} className="flex justify-center">
              <ResourceGridItem
                resource={resource}
                teams={teams}
                votes={votes[resource.id] || {}}
                onClick={() => setSelectedResource(resource)}
              />
            </div>
          ))}
        </div>
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