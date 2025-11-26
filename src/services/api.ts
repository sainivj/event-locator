import axios from 'axios';
// CHANGED: Added 'type' keyword
import type { EventItem } from '../types/models'; 

const DATA_SOURCE_URL = '/data.json';

export const fetchEventData = async (): Promise<EventItem[]> => {
  try {
    const response = await axios.get<EventItem[]>(DATA_SOURCE_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch event data:", error);
    throw error;
  }
};