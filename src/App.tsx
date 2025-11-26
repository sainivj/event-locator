import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Loader2, AlertCircle, MapPin, Calendar } from 'lucide-react';

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

  // Success State (Data Visualization)
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">System Status: Operational</h1>
          <p className="text-gray-600">Phase 3 Data Layer Verification</p>
        </header>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
          <span className="font-semibold text-gray-700">Events Retrieved:</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
            {filteredEvents.length} items
          </span>
        </div>

        <div className="grid gap-4">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venueName}</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs uppercase tracking-wider font-bold rounded">
                  {event.category}
                </span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="text-green-600 font-medium">
                  ${event.priceRange.min} - ${event.priceRange.max} {event.priceRange.currency}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;