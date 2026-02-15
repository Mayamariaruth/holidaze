import type { Booking } from './booking.types';

export interface Venue {
  id: string;
  name: string;
  description?: string;
  price: number;
  rating?: number;
  maxGuests: number;
  meta: VenueMeta;
  location: Location;
  bookings?: Booking[];
  created?: string;
  owner?: {
    name: string;
  };
  media?: {
    url: string;
    alt?: string;
  }[];
}

/**
 * Venue metadata for amenities.
 */
export interface VenueMeta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  long: number;
}

export interface VenuePayload {
  name: string;
  description?: string;
  price: number;
  rating?: number;
  maxGuests: number;
  meta: VenueMeta;
  location: Location;
  owner?: string;
  media?: {
    url: string;
    alt?: string;
  }[];
}
