import { Link } from 'react-router-dom';
import { Heart, Globe } from 'lucide-react';
import type { EventItem } from '../../types/models';
import { cn } from '../../utils/cn';

interface EventCardV2Props {
  event: EventItem;
  className?: string;
}

export const EventCardV2 = ({ event, className }: EventCardV2Props) => {
  // Format Date: "Fri, Dec 5 • 7:00 PM"
  const dateObj = new Date(event.date);
  const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const timeStr = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <Link 
      to={`/event/${event.slug}`}
      className={cn("group block w-full cursor-pointer", className)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Price Badge (Top Left) */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm text-gray-900">
          {event.priceRange.min === 0 ? "Free" : `$${event.priceRange.min}`}
        </div>

        {/* Favorite Icon (Top Right) - Visual Only for now */}
        <button className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-white/20 text-white transition-colors backdrop-blur-sm">
          <Heart className="h-4 w-4" />
        </button>

        {/* Online Badge */}
        {event.isOnline && (
          <div className="absolute bottom-3 left-3 bg-green-500/90 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 backdrop-blur-sm">
            <Globe className="h-3 w-3" /> Online
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="mt-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 text-base group-hover:text-blue-600 transition-colors">
            {event.title}
          </h3>
        </div>

        <p className="text-sm font-medium text-red-600 mt-1">
          {dateStr} • {timeStr}
        </p>

        <p className="text-sm text-gray-500 mt-0.5 truncate">
          {event.isOnline 
            ? "Virtual Event" 
            : `${event.location.venueName}, ${event.location.city}`
          }
        </p>
      </div>
    </Link>
  );
};