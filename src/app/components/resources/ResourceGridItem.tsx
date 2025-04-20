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
      className="group cursor-pointer max-w-[400px]"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.2rem] bg-gray-100 mb-5">
        {resource.image ? (
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            priority
          />
        ) : (
          <div className={`w-full h-full ${generatePlaceholderColor()} flex items-center justify-center`}>
            <span className="text-white text-opacity-30 text-2xl font-bold">
              {resource.title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="space-y-3">
        <h3 className="text-[1.4rem] font-extrabold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
          {resource.title}
        </h3>
        <p className="text-[1rem] text-gray-600 leading-normal line-clamp-2">
          {resource.description}
        </p>
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{totalVotes}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
              <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
            </svg>
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