import { endpoints } from '../config/api';
import { apiFetch } from '../utils/api';
import type { CreateBookingPayload } from '../types/booking.types';

export function createBooking(payload: CreateBookingPayload) {
  return apiFetch(endpoints.bookings, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
