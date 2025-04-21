'use client';

import { Resource } from '@/app/types';
import Image from 'next/image';

interface ResourceGridItemProps {
  resource: Resource;
  onClick: () => void;
}

export default function ResourceGridItem({ resource, onClick }: ResourceGridItemProps) {
  const totalVotes = resource.votes?.length || 0;
  const categoryName = resource.category?.name || 'Non catégorisé';

  return (
    <article 
      className="max-w-[300px] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="relative h-40">
        {resource.imageUrl ? (
          <Image
            src={resource.imageUrl}
            alt={resource.title}
            fill
            className="object-cover"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center bg-gray-100"
          >
            <span className="text-gray-400">{resource.location || 'Aucune localisation'}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-[0.9rem] font-semibold mb-2 line-clamp-2">
          {resource.title || 'Sans titre'}
        </h3>
        <p className="text-[0.8rem] text-gray-600 mb-2 line-clamp-2">
          {resource.content || 'Aucun contenu'}
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-[0.75rem] px-2 py-1 bg-gray-100 rounded-full">
              {categoryName}
            </span>
            <span className="text-[0.8rem] font-medium">
              {totalVotes} vote{totalVotes !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex justify-between items-center text-[0.75rem] text-gray-500">
            <span>{resource.date ? new Date(resource.date).toLocaleDateString() : 'Date inconnue'}</span>
            <span>{resource.location || 'Lieu inconnu'}</span>
          </div>
          {resource.status === 'draft' && (
            <span className="text-[0.75rem] text-amber-600 bg-amber-50 px-2 py-1 rounded-full self-start">
              Brouillon
            </span>
          )}
        </div>
      </div>
    </article>
  );
} 