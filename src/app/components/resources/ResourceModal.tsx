'use client';

import { Resource } from '@/app/types';
import Image from 'next/image';

interface ResourceModalProps {
  resource: Resource;
  onClose: () => void;
}

export default function ResourceModal({ resource, onClose }: ResourceModalProps) {
  const categoryName = resource.category?.name || 'Non catégorisé';
  const categoryDescription = resource.category?.description;
  const totalVotes = resource.votes?.length || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{resource.title || 'Sans titre'}</h2>
                {resource.status === 'draft' && (
                  <span className="text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    Brouillon
                  </span>
                )}
              </div>
              <div className="flex gap-2 text-sm text-gray-500 mt-1">
                <span>{resource.date ? new Date(resource.date).toLocaleDateString() : 'Date inconnue'}</span>
                <span>•</span>
                <span>{resource.location || 'Lieu inconnu'}</span>
                <span>•</span>
                <span>{totalVotes} vote{totalVotes !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="relative h-64 mb-4">
            {resource.imageUrl ? (
              <Image
                src={resource.imageUrl}
                alt={resource.title || 'Image de la ressource'}
                fill
                className="object-cover rounded-lg"
              />
            ) : (
              <div 
                className="w-full h-full rounded-lg flex items-center justify-center bg-gray-100"
              >
                <span className="text-gray-400">{resource.location || 'Aucune image disponible'}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">{resource.content || 'Aucun contenu disponible'}</p>
            {resource.link && (
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Voir la ressource
              </a>
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Catégorie :</h3>
            <div className="flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full bg-gray-100 w-fit">
                {categoryName}
              </span>
              {categoryDescription && (
                <p className="text-sm text-gray-600">{categoryDescription}</p>
              )}
            </div>
          </div>

          {resource.votes && resource.votes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Votes par équipe :</h3>
              <div className="flex flex-wrap gap-2">
                {resource.votes.map((vote) => (
                  <div
                    key={vote.id}
                    className="flex items-center gap-1 px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${vote.team.color}20` }}
                  >
                    <span style={{ color: vote.team.color }}>{vote.team.name}</span>
                    <span className="text-sm">({vote.value})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 