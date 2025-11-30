import { useEffect, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { HeroBanner } from '../components/feed/HeroBanner';
import { CategoryFilterBar } from '../components/feed/CategoryFilterBar';
import { Swimlane } from '../components/feed/Swimlane';
import { EventCardV2 } from '../components/cards/EventCardV2';
import { Loader2, SearchX } from 'lucide-react'; // Added SearchX icon

export const Feed = () => {
  const { 
    fetchEvents, 
    rawEvents, 
    filteredEvents, 
    isLoading, 
    filterCategory, 
    setCategory,
    // ADDED: We need these to detect if "Search Mode" is active
    searchQuery,
    filterLocation
  } = useStore();
  
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Derived Data
  const featuredEvent = useMemo(() => rawEvents.find(e => e.isFeatured) || rawEvents[0], [rawEvents]);
  const onlineEvents = useMemo(() => rawEvents.filter(e => e.isOnline), [rawEvents]);
  const trendingEvents = useMemo(() => rawEvents.filter(e => !e.isOnline).slice(0, 5), [rawEvents]);

  // ADDED: Logic to determine if we are searching
  const isSearching = searchQuery.length > 0 || filterLocation.length > 0;

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (rawEvents.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-10 pb-24">
      
      {/* LOGIC CHANGE: 
         Only show Hero and Swimlanes if NOT searching. 
      */}
      {!isSearching && (
        <>
          {/* SECTION 1: HERO */}
          {featuredEvent && (
            <section className="animate-in fade-in slide-in-from-top-4 duration-500">
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

          {/* SECTION 3: SWIMLANES */}
          <div className="space-y-10">
            <Swimlane title="Trending in Toronto" events={trendingEvents} />
            <Swimlane title="Upcoming Online Events" events={onlineEvents} />
          </div>
        </>
      )}

      {/* SECTION 4: ALL EVENTS / SEARCH RESULTS */}
      <section className={isSearching ? "pt-4" : ""}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isSearching 
              ? 'Search Results' 
              : (filterCategory === 'all' ? 'All Events' : `${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)} Events`)
            }
          </h2>
          <span className="text-sm text-gray-500 font-medium">
            {filteredEvents.length} results
          </span>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {filteredEvents.map(event => (
              <EventCardV2 key={event.id} event={event} />
            ))}
          </div>
        ) : (
          /* Empty State for Search */
          <div className="py-20 text-center bg-gray-100 rounded-xl border border-dashed border-gray-300">
            <SearchX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No events found</h3>
            <p className="text-gray-500">
              We couldn't find anything matching "{searchQuery}"
              {filterLocation && ` in ${filterLocation}`}.
            </p>
            <button 
              onClick={() => {
                setCategory('all');
                // We should also clear search here ideally, but the user can use the X buttons
              }}
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