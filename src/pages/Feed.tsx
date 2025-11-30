import { useEffect, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { HeroBanner } from '../components/feed/HeroBanner';
import { CategoryFilterBar } from '../components/feed/CategoryFilterBar';
import { Swimlane } from '../components/feed/Swimlane';
import { EventCardV2 } from '../components/cards/EventCardV2';
import { Loader2 } from 'lucide-react';

export const Feed = () => {
  const { 
    fetchEvents, 
    rawEvents, 
    filteredEvents, 
    isLoading, 
    filterCategory, 
    setCategory 
  } = useStore();
  
  // 1. Fetch Data on Mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // 2. Derive Special Lists (Memoized for performance)
  const featuredEvent = useMemo(() => {
    return rawEvents.find(e => e.isFeatured) || rawEvents[0];
  }, [rawEvents]);

  const onlineEvents = useMemo(() => {
    return rawEvents.filter(e => e.isOnline);
  }, [rawEvents]);

  const trendingEvents = useMemo(() => {
    // In a real app, this might sort by popularity. 
    // For now, we take the first 5 physical events.
    return rawEvents.filter(e => !e.isOnline).slice(0, 5);
  }, [rawEvents]);

  // 3. Loading State (Simple Spinner)
  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // 4. Empty/Error State
  if (rawEvents.length === 0) {
    return null; // Or an error message
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-10 pb-24">
      
      {/* SECTION 1: HERO */}
      {featuredEvent && (
        <section>
          <HeroBanner event={featuredEvent} />
        </section>
      )}

      {/* SECTION 2: CATEGORIES */}
      <section className="sticky top-[64px] md:top-[80px] bg-gray-50/95 backdrop-blur-sm z-30 -mx-4 md:mx-0 px-4 md:px-0 py-2 border-b border-gray-200/50 transition-all">
        <CategoryFilterBar 
          activeCategory={filterCategory} 
          onSelectCategory={setCategory} 
        />
      </section>

      {/* SECTION 3: SWIMLANES (Horizontal Scroll) */}
      <div className="space-y-10">
        <Swimlane 
          title="Trending in Toronto" 
          events={trendingEvents} 
        />
        
        <Swimlane 
          title="Upcoming Online Events" 
          events={onlineEvents} 
        />
      </div>

      {/* SECTION 4: ALL EVENTS (Grid) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filterCategory === 'all' ? 'All Events' : `${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)} Events`}
          </h2>
          <span className="text-sm text-gray-500 font-medium">
            {filteredEvents.length} results
          </span>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
              <EventCardV2 key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-gray-100 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No events found for this category.</p>
            <button 
              onClick={() => setCategory('all')}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

    </div>
  );
};