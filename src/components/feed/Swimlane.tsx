import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { EventItem } from '../../types/models';
import { EventCardV2 } from '../cards/EventCardV2';

interface SwimlaneProps {
  title: string;
  events: EventItem[];
  seeAllLink?: string;
}

export const Swimlane = ({ title, events, seeAllLink = "/" }: SwimlaneProps) => {
  if (events.length === 0) return null;

  return (
    <section className="py-6 md:py-8">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-0 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
        {seeAllLink && (
          <Link 
            to={seeAllLink} 
            className="group flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            See all 
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      {/* Responsive Layout:
         - Mobile: Horizontal Scroll (Carousel)
         - Desktop: Grid (4 columns)
      */}
      <div className="
        flex gap-4 overflow-x-auto px-4 pb-4 -mx-4 scrollbar-hide snap-x
        md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:mx-0
      ">
        {events.map((event) => (
          <div key={event.id} className="min-w-[280px] md:min-w-0 snap-center">
            <EventCardV2 event={event} />
          </div>
        ))}
      </div>
    </section>
  );
};