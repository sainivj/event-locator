// Updated to V2 Schema to support Discovery Platform features
export type EventStatus = 'upcoming' | 'cancelled' | 'sold-out';

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface LocationData {
  city: string;        // e.g., "Toronto"
  neighborhood: string; // e.g., "The Annex" - Critical for V2 Filtering
  venueName: string;    // e.g., "Lee's Palace"
  coordinates: GeoCoordinates;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

export interface EventMetadata {
  isFamilyFriendly: boolean;
  isWheelchairAccessible: boolean;
  hasParking: boolean;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryIcon: string; // New: Maps to Lucide icon names (e.g., "music", "trophy")
  
  // Revised Location Object (Hierarchy Split)
  location: LocationData; 
  
  date: string; // ISO 8601
  priceRange: PriceRange;
  imageUrl: string;
  status: EventStatus;
  metadata: EventMetadata;
  tags: string[];
  
  // New V2 Boolean Flags
  isOnline: boolean;   // Powers "Online Events" swimlane
  isFeatured: boolean; // Powers "Hero" banner
}