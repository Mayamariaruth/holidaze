import type { Venue } from '../types/venue.types';

interface SearchParams {
  location?: string;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  guests?: number | null;
}

export function filterVenues(venues: Venue[], params: SearchParams): Venue[] {
  return venues.filter((venue) => {
    // Location
    if (
      params.location &&
      !venue.location?.city?.toLowerCase().includes(params.location.toLowerCase())
    ) {
      return false;
    }

    // Guests
    if (params.guests && venue.maxGuests < params.guests) {
      return false;
    }

    // Availability
    if (params.dateFrom && params.dateTo && venue.bookings?.length) {
      const requestedFrom = new Date(params.dateFrom);
      const requestedTo = new Date(params.dateTo);

      const isUnavailable = venue.bookings.some((booking) => {
        const bookedFrom = new Date(booking.dateFrom);
        const bookedTo = new Date(booking.dateTo);

        return requestedFrom < bookedTo && requestedTo > bookedFrom;
      });

      if (isUnavailable) return false;
    }

    return true;
  });
}
