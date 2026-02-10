import type { Booking } from '../types/booking.types';
export function isOverlapping(from: Date, to: Date, bookings: Booking[]): boolean {
  return bookings.some((booking) => {
    const bookedFrom = new Date(booking.dateFrom);
    const bookedTo = new Date(booking.dateTo);

    return from < bookedTo && to > bookedFrom;
  });
}
