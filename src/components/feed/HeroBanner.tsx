import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import type { EventItem } from '../../types/models';

interface HeroBannerProps {
  event: EventItem;
}

export const HeroBanner = ({ event }: HeroBannerProps) => {
  return (
    <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden rounded-2xl group cursor-pointer">
      <Link to={`/event/${event.slug}`} className="block h-full w-full">
        {/* Background Image */}
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content Block */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
          <span className="inline-block px-3 py-1 bg-red-600 text-xs font-bold uppercase tracking-wider rounded mb-3">
            Featured Event
          </span>
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 leading-tight max-w-3xl text-white shadow-sm">
            {event.title}
          </h1>
          
          <p className="text-gray-200 text-lg mb-6 line-clamp-1 max-w-2xl">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-500" />
              <span>
                {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
            </div>
            
            {!event.isOnline && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <span>{event.location.venueName}</span>
              </div>
            )}
            
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2.5 rounded-full font-bold transition-colors ml-auto md:ml-0">
              Get Tickets
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};