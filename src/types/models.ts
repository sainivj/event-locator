export type EventStatus = 'upcoming' | 'cancelled' | 'sold-out';

export interface GeoCoordinates {
  lat: number;
  lng: number;
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
  venueName: string;
  category: string;
  coordinates: GeoCoordinates;
  date: string;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  imageUrl: string;
  status: EventStatus;
  metadata: EventMetadata;
  tags: string[];
}