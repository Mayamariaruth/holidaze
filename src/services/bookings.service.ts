import { endpoints } from '../config/api';
import { apiFetch } from '../utils/api';
import type { UserBooking, CreateBookingPayload } from '../types/booking.types';

/**
 * Fetches all bookings for a specific venue.
 *
 * @param {string} venueId ID of the venue.
 * @returns {Promise<UserBooking[]>} Array of bookings with venue and customer data.
 */
export function fetchBookingsByVenue(venueId: string) {
  return apiFetch<UserBooking[]>(
    `${endpoints.bookings}?venueId=${venueId}&_customer=true&_venue=true`
  );
}

/**
 * Creates a new booking.
 *
 * @param {CreateBookingPayload} payload Booking details.
 * @returns {Promise<UserBooking>} Created booking.
 */
export function createBooking(payload: CreateBookingPayload) {
  return apiFetch<UserBooking>(endpoints.bookings, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
