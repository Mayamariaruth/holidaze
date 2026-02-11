export type AccountType = 'customer' | 'venue_manager';

export interface UserBooking {
  id: string;
  venueName: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  status: string;
}

export interface Favorite {
  id: string;
  name: string;
  venueId?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  accountType: AccountType;
  bookings?: UserBooking[];
  favorites?: Favorite[];
}
