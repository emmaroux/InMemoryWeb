import { Resource } from '@/app/types';
import Image from 'next/image';

interface ResourceGridItemProps {
  resource: Resource;
  onClick: () => void;
}

export default function ResourceGridItem({ resource, onClick }: ResourceGridItemProps) {
  const generatePlaceholderColor = () => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-emerald-500 to-teal-600',
      'from-rose-500 to-pink-600',
      'from-amber-500 to-orange-600',
      'from-indigo-500 to-violet-600'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {resource.image ? (
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1440px) 30vw, 23vw"
            className="object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
            priority
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${generatePlaceholderColor()} flex items-center justify-center`}>
            <span className="text-white text-3xl font-bold opacity-80">
              {resource.title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
          {resource.title}
        </h3>
      </div>
    </div>
  );
} 