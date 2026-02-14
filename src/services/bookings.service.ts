import { endpoints } from '../config/api';
import { apiFetch } from '../utils/api';
import type { UserBooking, CreateBookingPayload } from '../types/booking.types';

export function fetchBookingsByVenue(venueId: string) {
  return apiFetch<UserBooking[]>(
    `${endpoints.bookings}?venueId=${venueId}&_customer=true&_venue=true`
  );
}

export function createBooking(payload: CreateBookingPayload) {
  return apiFetch(endpoints.bookings, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
