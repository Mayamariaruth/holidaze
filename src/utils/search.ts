import type { Venue } from '../types/venue.types';

interface SearchParams {
  location?: string;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  guests?: number | null;
}

export function filterVenues(venues: Venue[], params: SearchParams): Venue[] {
  return venues.filter((venue) => {
    // Location filter
    if (
      params.location &&
      !venue.location?.city?.toLowerCase().includes(params.location.toLowerCase())
    ) {
      return false;
    }

    // Guests filter
    if (params.guests && venue.maxGuests < params.guests) {
      return false;
    }

    return true;
  });
}
