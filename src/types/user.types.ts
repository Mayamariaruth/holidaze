import type { Venue } from './venue.types';
import type { UserBooking } from './booking.types';

export type AccountType = 'customer' | 'venue_manager';

export interface UserProfile {
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url: string;
    alt: string;
  };
  banner?: {
    url: string;
    alt: string;
  };
  bookings?: UserBooking[];
  venueManager?: boolean;
  venues?: Venue[];
}

export interface UpdateProfilePayload {
  bio?: string;
  venueManager?: boolean;
  banner?: {
    url: string;
  };
  avatar?: {
    url: string;
  };
}
