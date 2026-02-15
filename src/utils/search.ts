import type { Venue } from '../types/venue.types';

interface SearchParams {
  location?: string;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  guests?: number | null;
}

/**
 * Filters a list of venues based on the given search parameters.
 *
 * @param {Venue[]} venues Array of venue objects to filter.
 * @param {SearchParams} params The search parameters to filter the venues by.
 * @returns {Venue[]} A filtered array of venues that match the search criteria.
 *
 * @example
 * const availableVenues = filterVenues(venues, { location: 'Stockholm', guests: 3, dateFrom: new Date('2023-09-15'), dateTo: new Date('2023-09-20') });
 */
export function filterVenues(venues: Venue[], params: SearchParams): Venue[] {
  return venues.filter((venue) => {
    // Location filter
    if (
      params.location &&
      !venue.location?.city?.toLowerCase().includes(params.location.toLowerCase())
    ) {
      return false;
    }

    // Guest filter
    if (params.guests && venue.maxGuests < params.guests) {
      return false;
    }

    // Availability filter
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
