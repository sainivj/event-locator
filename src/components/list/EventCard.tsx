import { MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom'; // IMPORT ADDED
import type { EventItem } from '../../types/models';

interface EventCardProps {
  event: EventItem;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    // CHANGED: Outer element is now a Link
    <Link 
      to={`/event/${event.slug}`} 
      className="block bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group hover:border-blue-200"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{event.venueName}</span>
          </div>
        </div>
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] uppercase tracking-wider font-bold rounded border border-gray-200">
          {event.category}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4 text-gray-400" />
          {new Date(event.date).toLocaleDateString()}
        </div>
        <div className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">
          ${event.priceRange.min}
        </div>
      </div>
    </Link>
  );
};