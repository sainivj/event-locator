import { create } from 'zustand';
import type { EventItem } from '../types/models';
import { fetchEventData } from '../services/api';

interface StoreState {
  // State Variables
  rawEvents: EventItem[];
  filteredEvents: EventItem[];
  isLoading: boolean;
  error: string | null;
  filterCategory: string;
  searchQuery: string;

  // Actions
  fetchEvents: () => Promise<void>;
  setCategory: (category: string) => void;
  setSearch: (query: string) => void;
  applyFilters: () => void;
  
  // New V2 Selectors/Helpers
  getUniqueLocations: () => { city: string; neighborhood: string }[];
}

export const useStore = create<StoreState>((set, get) => ({
  rawEvents: [],
  filteredEvents: [],
  isLoading: false,
  error: null,
  filterCategory: 'all',
  searchQuery: '',

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

  applyFilters: () => {
    const { rawEvents, filterCategory, searchQuery } = get();
    const lowerQuery = searchQuery.toLowerCase();

    const nextEvents = rawEvents.filter(evt => {
      // 1. Check Category
      const matchesCategory = filterCategory === 'all' || evt.category === filterCategory;
      
      // 2. Check Search (Title, Description, OR City/Neighborhood)
      const matchesSearch = 
        evt.title.toLowerCase().includes(lowerQuery) || 
        evt.description.toLowerCase().includes(lowerQuery) ||
        evt.location.city.toLowerCase().includes(lowerQuery) ||
        evt.location.neighborhood.toLowerCase().includes(lowerQuery);

      return matchesCategory && matchesSearch;
    });

    set({ filteredEvents: nextEvents });
  },

  // New Helper for the Typeahead Component
  getUniqueLocations: () => {
    const { rawEvents } = get();
    const locations = new Map<string, { city: string; neighborhood: string }>();

    rawEvents.forEach(evt => {
      // Create a unique key to prevent duplicates
      const key = `${evt.location.city}-${evt.location.neighborhood}`;
      if (!locations.has(key) && !evt.isOnline) {
         // Only add physical locations
        locations.set(key, { 
          city: evt.location.city, 
          neighborhood: evt.location.neighborhood 
        });
      }
    });

    return Array.from(locations.values());
  }
}));