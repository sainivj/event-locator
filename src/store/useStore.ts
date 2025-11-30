import { create } from 'zustand';
import type { EventItem } from '../types/models';
import { fetchEventData } from '../services/api';

interface StoreState {
  // Existing Data State...
  rawEvents: EventItem[];
  filteredEvents: EventItem[];
  isLoading: boolean;
  error: string | null;
  
  // Existing Filter State...
  filterCategory: string;
  searchQuery: string;       
  filterLocation: string;    

  // NEW: UI State for Mobile
  isMobileSearchOpen: boolean; 

  // Actions...
  fetchEvents: () => Promise<void>;
  setCategory: (category: string) => void;
  setSearch: (query: string) => void;
  setLocationFilter: (location: string) => void;
  clearFilters: () => void;
  applyFilters: (overrides?: { query?: string; location?: string; category?: string }) => void;
  
  // NEW: UI Action
  setMobileSearchOpen: (isOpen: boolean) => void;

  getUniqueLocations: () => { city: string; neighborhood: string }[];
}

export const useStore = create<StoreState>((set, get) => ({
  // ... Keep all existing initial state ...
  rawEvents: [],
  filteredEvents: [],
  isLoading: false,
  error: null,
  filterCategory: 'all',
  searchQuery: '',
  filterLocation: '',
  
  // NEW INITIAL STATE
  isMobileSearchOpen: false,

  // ... Keep all existing actions (fetchEvents, setCategory, etc.) ...
  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchEventData();
      set({ rawEvents: data, filteredEvents: data, isLoading: false });
    } catch (err) {
      set({ error: 'Failed to load events', isLoading: false });
    }
  },

  setCategory: (category) => {
    set({ filterCategory: category });
    get().applyFilters({ category });
  },

  setSearch: (query) => {
    set({ searchQuery: query });
    get().applyFilters({ query });
  },

  setLocationFilter: (location) => {
    set({ filterLocation: location });
    get().applyFilters({ location });
  },

  clearFilters: () => {
    set({ filterCategory: 'all', searchQuery: '', filterLocation: '' });
    get().applyFilters({ query: '', location: '', category: 'all' });
  },

  applyFilters: (overrides = {}) => {
    // ... (Keep existing logic exactly as is) ...
    const state = get();
    const currentCategory = overrides.category !== undefined ? overrides.category : state.filterCategory;
    const currentQuery = overrides.query !== undefined ? overrides.query : state.searchQuery;
    const currentLocation = overrides.location !== undefined ? overrides.location : state.filterLocation;

    const lowerQuery = currentQuery.toLowerCase();
    const lowerLocation = currentLocation.toLowerCase();

    const nextEvents = state.rawEvents.filter(evt => {
      const matchesCategory = currentCategory === 'all' || evt.category === currentCategory;
      const matchesSearch = evt.title.toLowerCase().includes(lowerQuery) || evt.description.toLowerCase().includes(lowerQuery);
      const matchesLocation = currentLocation === '' || evt.location.city.toLowerCase() === lowerLocation || evt.location.neighborhood.toLowerCase() === lowerLocation;
      return matchesCategory && matchesSearch && matchesLocation;
    });

    set({ filteredEvents: nextEvents });
  },

  // NEW ACTION
  setMobileSearchOpen: (isOpen) => {
    set({ isMobileSearchOpen: isOpen });
  },

  getUniqueLocations: () => {
    // ... (Keep existing logic) ...
    const { rawEvents } = get();
    const locations = new Map<string, { city: string; neighborhood: string }>();
    rawEvents.forEach(evt => {
      const key = `${evt.location.city}-${evt.location.neighborhood}`;
      if (!locations.has(key) && !evt.isOnline) {
        locations.set(key, { city: evt.location.city, neighborhood: evt.location.neighborhood });
      }
    });
    return Array.from(locations.values());
  }
}));