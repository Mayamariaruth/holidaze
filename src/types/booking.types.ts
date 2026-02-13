export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

export interface UserBooking extends Booking {
  venue?: {
    id: string;
    name: string;
    price: number;
    location?: Location;
    media?: { url: string; alt?: string }[];
  };
}

export interface CreateBookingPayload {
  venueId: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
}
