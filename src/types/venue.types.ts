export interface Venue {
  id: string;
  name: string;
  description?: string;
  price: number;
  rating?: number;
  maxGuests: number;
  meta: VenueMeta;
  location: Location;
  owner?: {
    name: string;
  };
  media?: {
    url: string;
    alt?: string;
  }[];
}

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
