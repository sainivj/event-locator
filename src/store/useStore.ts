import { create } from 'zustand';
import type { EventItem } from '../types/models';
import { fetchEventData } from '../services/api';

interface StoreState {
  // State Variables
  rawEvents: EventItem[];
  filteredEvents: EventItem[];
  isLoading: boolean;
  error: string | null;
  
  // Filters
  filterCategory: string;
  searchQuery: string;       // "The What" (Keywords)
  filterLocation: string;    // "The Where" (Specific Neighborhood or City)

  // Actions
  fetchEvents: () => Promise<void>;
  setCategory: (category: string) => void;
  setSearch: (query: string) => void;
  setLocationFilter: (location: string) => void; // New Action
  clearFilters: () => void;
  applyFilters: () => void;
  
  // Selectors
  getUniqueLocations: () => { city: string; neighborhood: string }[];
}

export const useStore = create<StoreState>((set, get) => ({
  rawEvents: [],
  filteredEvents: [],
  isLoading: false,
  error: null,
  
  filterCategory: 'all',
  searchQuery: '',
  filterLocation: '', // Empty string means "Everywhere"

  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchEventData();
      set({ rawEvents: data, filteredEvents: data, isLoading: false });
    } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to load events', isLoading: false });
    }
  },

  setCategory: (category) => {
    set({ filterCategory: category });
    get().applyFilters();
  },

  setSearch: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setLocationFilter: (location) => {
    set({ filterLocation: location });
    get().applyFilters();
  },

  clearFilters: () => {
    set({ 
      filterCategory: 'all', 
      searchQuery: '', 
      filterLocation: '' 
    });
    get().applyFilters();
  },

  applyFilters: () => {
    const { rawEvents, filterCategory, searchQuery, filterLocation } = get();
    const lowerQuery = searchQuery.toLowerCase();
    const lowerLocation = filterLocation.toLowerCase();

    const nextEvents = rawEvents.filter(evt => {
      // 1. Check Category
      const matchesCategory = filterCategory === 'all' || evt.category === filterCategory;
      
      // 2. Check Keyword (Title or Description)
      const matchesSearch = 
        evt.title.toLowerCase().includes(lowerQuery) || 
        evt.description.toLowerCase().includes(lowerQuery);

      // 3. Check Location (Exact Match on City or Neighborhood)
      // If filterLocation is empty, we match everything.
      const matchesLocation = 
        filterLocation === '' || 
        evt.location.city.toLowerCase() === lowerLocation || 
        evt.location.neighborhood.toLowerCase() === lowerLocation;

      return matchesCategory && matchesSearch && matchesLocation;
    });

    set({ filteredEvents: nextEvents });
  },

  getUniqueLocations: () => {
    const { rawEvents } = get();
    const locations = new Map<string, { city: string; neighborhood: string }>();

    rawEvents.forEach(evt => {
      // Create a unique key to prevent duplicates
      const key = `${evt.location.city}-${evt.location.neighborhood}`;
      if (!locations.has(key) && !evt.isOnline) {
        locations.set(key, { 
          city: evt.location.city, 
          neighborhood: evt.location.neighborhood 
        });
      }
    });

    return Array.from(locations.values());
  }
}));