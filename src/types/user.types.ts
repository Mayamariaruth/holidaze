export type AccountType = 'customer' | 'venue_manager';

export interface UserBooking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  status: string;
  venue?: {
    id: string;
    name: string;
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
  accountType: AccountType;
  bookings?: UserBooking[];
  favorites?: Favorite[];
}
