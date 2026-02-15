import type { Booking } from '../types/booking.types';

/**
 * Checks if a booking time period overlaps with any existing bookings.
 *
 * @param {Date} from The start date of the new booking.
 * @param {Date} to The end date of the new booking.
 * @param {Booking[]} bookings Array of existing bookings to check against.
 * @returns {boolean} Returns `true` if there is any overlap, otherwise `false`.
 *
 * @example
 * const isConflict = isOverlapping(new Date('2023-09-15T10:00'), new Date('2023-09-15T12:00'), bookings);
 */
export function isOverlapping(from: Date, to: Date, bookings: Booking[]): boolean {
  return bookings.some((booking) => {
    const bookedFrom = new Date(booking.dateFrom);
    const bookedTo = new Date(booking.dateTo);

    return from < bookedTo && to > bookedFrom;
  });
}
