import axios from 'axios';
import type { EventItem } from '../types/models';

export const fetchEventData = async (): Promise<EventItem[]> => {
  try {
    // FIX: Append a unique timestamp (?t=...) to the URL.
    // This forces the browser to bypass its cache and load the latest file.
    const response = await axios.get<EventItem[]>(`/data.json?t=${Date.now()}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch event data:", error);
    throw error;
  }
};