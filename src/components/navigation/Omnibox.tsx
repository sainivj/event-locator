import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../utils/cn';

export const Omnibox = () => {
  const { 
    searchQuery, 
    setSearch, 
    filterLocation, 
    setLocationFilter, 
    getUniqueLocations 
  } = useStore();

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // FIX: Local state for immediate typing response
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Sync local state if store changes externally (e.g., clear filters)
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Debounce the store update to prevent freezing while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== searchQuery) {
        setSearch(localQuery);
      }
    }, 300); // Wait 300ms after user stops typing to filter

    return () => clearTimeout(timer);
  }, [localQuery, setSearch, searchQuery]);

  // Get locations for the dropdown
  const locations = getUniqueLocations();

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex w-full max-w-2xl bg-gray-100 border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all relative z-50">
      
      {/* 1. KEYWORD INPUT (The "What") */}
      <div className="flex-1 flex items-center px-4 border-r border-gray-300">
        <Search className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
        <input
          type="text"
          // FIX: Bind to localQuery instead of store query
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Event, artist, or keyword..."
          className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-900 placeholder:text-gray-500 h-12"
        />
        {localQuery && (
          <button 
            onClick={() => {
              setLocalQuery('');
              setSearch('');
            }} 
            className="p-1 hover:bg-gray-200 rounded-full"
          >
             <X className="h-3 w-3 text-gray-500" />
          </button>
        )}
      </div>

      {/* 2. LOCATION INPUT (The "Where") */}
      <div className="flex-1 flex items-center px-4 relative" ref={dropdownRef}>
        <MapPin className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
        <input
          type="text"
          value={filterLocation}
          onFocus={() => setIsLocationOpen(true)}
          readOnly 
          placeholder="Anywhere / Neighborhood"
          className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-900 placeholder:text-gray-500 cursor-pointer h-12"
        />
        {filterLocation && (
          <button onClick={() => setLocationFilter('')} className="p-1 hover:bg-gray-200 rounded-full">
             <X className="h-3 w-3 text-gray-500" />
          </button>
        )}

        {/* 3. LOCATION DROPDOWN (Typeahead) */}
        {isLocationOpen && (
          <div className="absolute top-14 right-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
            <h4 className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Popular Neighborhoods
            </h4>
            
            <button
              onClick={() => {
                setLocationFilter('');
                setIsLocationOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-gray-700"
            >
              <div className="bg-gray-100 p-2 rounded-full">
                <MapPin className="h-4 w-4 text-gray-500" />
              </div>
              Anywhere (Clear)
            </button>

            {locations.map((loc) => (
              <button
                key={`${loc.city}-${loc.neighborhood}`}
                onClick={() => {
                  setLocationFilter(loc.neighborhood);
                  setIsLocationOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-sm font-medium transition-colors",
                  filterLocation === loc.neighborhood ? "bg-blue-50 text-blue-700" : "text-gray-700"
                )}
              >
                <div className={cn(
                  "p-2 rounded-full",
                  filterLocation === loc.neighborhood ? "bg-blue-100" : "bg-gray-100"
                )}>
                  <MapPin className={cn(
                    "h-4 w-4",
                    filterLocation === loc.neighborhood ? "text-blue-600" : "text-gray-500"
                  )} />
                </div>
                <span>
                  {loc.neighborhood}, <span className="text-gray-400 font-normal">{loc.city}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};