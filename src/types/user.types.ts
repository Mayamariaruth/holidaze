export type AccountType = 'customer' | 'venue_manager';

export interface UserBooking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venue?: {
    id: string;
    name: string;
    price: number;
    location?: {
      address: string;
      city: string;
      zip: string;
      country: string;
    };
    media?: {
      url: string;
      alt: string;
    };
  };
}

export interface Favorite {
  id: string;
  name: string;
  venueId?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: {
    url: string;
    alt: string;
  };
  banner?: {
    url: string;
    alt: string;
  };
  bookings?: UserBooking[];
  favorites?: Favorite[];
  venueManager?: boolean;
}
