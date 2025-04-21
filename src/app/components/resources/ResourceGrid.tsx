'use client';

import { useState } from 'react';
import { Resource } from '@/app/types';
import ResourceGridItem from './ResourceGridItem';
import ResourceModal from './ResourceModal';

interface ResourceGridProps {
  resources: Resource[];
}

export default function ResourceGrid({ resources }: ResourceGridProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {resources.map((resource) => (
        <ResourceGridItem
          key={resource.id}
          resource={resource}
          onClick={() => setSelectedResource(resource)}
        />
      ))}
      {selectedResource && (
        <ResourceModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}
    </div>
  );
} 