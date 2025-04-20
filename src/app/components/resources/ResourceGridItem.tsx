import { Resource, Team, Vote } from '@/app/types';
import Image from 'next/image';

interface ResourceGridItemProps {
  resource: Resource;
  teams: Team[];
  votes: { [teamId: string]: Vote[] };
  onClick: () => void;
}

export default function ResourceGridItem({ resource, teams, votes, onClick }: ResourceGridItemProps) {
  const totalVotes = teams.reduce((sum, team) => {
    return sum + (votes[team.id]?.length || 0);
  }, 0);

  const generatePlaceholderColor = () => {
    const colors = [
      'bg-[#2563eb]',
      'bg-[#9333ea]',
      'bg-[#16a34a]',
      'bg-[#ea580c]',
      'bg-[#dc2626]',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <article 
      className="group cursor-pointer w-[240px] bg-white hover:shadow-lg transition-shadow duration-300 rounded-[1rem] overflow-hidden"
      onClick={onClick}
    >
      <div className="relative w-[240px] h-[140px] overflow-hidden bg-gray-100">
        {resource.image ? (
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            priority
          />
        ) : (
          <div className={`w-full h-full ${generatePlaceholderColor()} flex items-center justify-center`}>
            <span className="text-white text-2xl font-bold">
              {resource.title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2 border-t border-gray-100">
        <h3 className="text-[1rem] font-bold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {resource.title}
        </h3>
        <p className="text-[0.8rem] text-gray-600 leading-relaxed line-clamp-2">
          {resource.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
            </svg>
            <span className="text-sm font-medium">{totalVotes}</span>
          </div>
          <time className="text-sm text-gray-500" dateTime={resource.createdAt.toISOString()}>
            {new Date(resource.createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long'
            })}
          </time>
        </div>
      </div>
    </article>
  );
} 