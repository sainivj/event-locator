import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Loader2, AlertCircle, Map as MapIcon, List as ListIcon } from 'lucide-react';
import EventMap from '../components/map/EventMap';
import { EventCard } from '../components/list/EventCard';
import clsx from 'clsx'; 

export const Home = () => {
  const { fetchEvents, filteredEvents, isLoading, error } = useStore();
  
  // State to toggle views on mobile (List vs Map)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Loading CityPulse...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-red-500 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-bold text-gray-800">Error Loading Data</h2>
          </div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    // CHANGED: Removed 'relative' from here to prevent stacking context trapping
    <div className="h-screen flex flex-col bg-gray-100">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex-none z-20 shadow-sm relative">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">CityPulse 📍</h1>
            <p className="text-xs text-gray-500 font-medium hidden sm:block">Toronto Event Locator</p>
          </div>
          <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold border border-blue-100">
            {filteredEvents.length} Events
          </div>
        </div>
      </header>

      {/* Main Content: Split View */}
      {/* CHANGED: Ensure z-index is low (0) so it stays below the button */}
      <div className="flex-1 flex overflow-hidden relative z-0">
        
        {/* Left Side: List View */}
        <div className={clsx(
          "w-full md:w-1/3 overflow-y-auto p-4 md:p-6 border-r border-gray-200 bg-gray-50 scroll-smooth pb-32 md:pb-6",
          viewMode === 'map' ? 'hidden md:block' : 'block'
        )}>
          <div className="grid gap-4"> 
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Right Side: Map View */}
        <div className={clsx(
          "w-full md:w-2/3 bg-gray-200 h-full relative",
          viewMode === 'list' ? 'hidden md:block' : 'block'
        )}>
           <EventMap />
        </div>
      </div>

      {/* FLOATING ACTION BUTTON - NUCLEAR FIX */}
      {/* 1. Used inline 'position: fixed' to override any Tailwind quirks.
          2. set zIndex to 99999.
          3. Removed 'md:hidden' -> IT SHOULD SHOW ON DESKTOP NOW TOO.
      */}
      <div 
        style={{
          position: 'fixed',
          bottom: '50px', // Raised higher to avoid iPhone Home Bar
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999,
          width: 'max-content'
        }}
      >
        <button
          onClick={() => setViewMode(prev => prev === 'list' ? 'map' : 'list')}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl hover:bg-gray-800 transition-transform active:scale-95 font-semibold border-2 border-white/20"
        >
          {viewMode === 'list' ? (
            <>
              <MapIcon className="h-5 w-5" />
              <span>Show Map</span>
            </>
          ) : (
            <>
              <ListIcon className="h-5 w-5" />
              <span>Show List</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};