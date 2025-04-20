import { Resource, Team, Vote, Comment } from '@/app/types';
import Image from 'next/image';

interface ResourceModalProps {
  resource: Resource;
  teams: Team[];
  votes: { [teamId: string]: Vote[] };
  comments: Comment[];
  onClose: () => void;
}

export default function ResourceModal({ resource, teams, votes, comments, onClose }: ResourceModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{resource.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="relative h-64 mb-4">
            {resource.image ? (
              <Image
                src={resource.image}
                alt={resource.title}
                fill
                className="object-cover rounded-lg"
              />
            ) : (
              <div 
                className="w-full h-full rounded-lg"
                style={{ backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}` }}
              />
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">{resource.description}</p>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Voir la ressource
            </a>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Votes par équipe :</h3>
            <div className="flex flex-wrap gap-2">
              {teams.map(team => {
                const teamVotes = votes[team.id] || [];
                return (
                  <div
                    key={team.id}
                    className="flex items-center px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${team.color}20` }}
                  >
                    <span style={{ color: team.color }}>{team.name}: </span>
                    <span className="ml-1 font-bold">{teamVotes.length}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Commentaires :</h3>
            <div className="space-y-2">
              {comments.map(comment => (
                <div
                  key={comment.id}
                  className="p-3 rounded"
                  style={{ backgroundColor: `${comment.team.color}10` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.author.name}</span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{ backgroundColor: comment.team.color, color: 'white' }}
                    >
                      {comment.team.name}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 