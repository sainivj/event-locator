import { create } from 'zustand';
// CHANGED: Added 'type' keyword for verbatimModuleSyntax compliance
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
  
  // CHANGED: Added this line so TypeScript knows this function exists
  applyFilters: () => void;
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
      
      // 2. Check Search (Title or Description)
      const matchesSearch = 
        evt.title.toLowerCase().includes(lowerQuery) || 
        evt.description.toLowerCase().includes(lowerQuery);

      return matchesCategory && matchesSearch;
    });

    set({ filteredEvents: nextEvents });
  }
}));