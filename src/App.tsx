import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Loader2, AlertCircle, MapPin, Calendar } from 'lucide-react';
import EventMap from './components/map/EventMap';

function App() {
  const { 
    fetchEvents, 
    filteredEvents, 
    isLoading, 
    error 
  } = useStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Loading CityPulse Data...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-red-500 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-bold text-gray-800">Error Loading Data</h2>
          </div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Success State: Split View (List + Map)
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex-none z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">CityPulse 📍</h1>
            <p className="text-xs text-gray-500 font-medium">Toronto Event Locator</p>
          </div>
          <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold border border-blue-100">
            {filteredEvents.length} Events Found
          </div>
        </div>
      </header>

      {/* Main Content Area - Split View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Scrollable List */}
        <div className="w-full md:w-1/3 overflow-y-auto p-4 md:p-6 border-r border-gray-200 bg-gray-50">
          <div className="grid gap-4">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
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
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Sticky Map */}
        <div className="hidden md:block w-2/3 bg-gray-200 relative h-full">
           <EventMap />
        </div>

      </div>
    </div>
  );
}

export default App;