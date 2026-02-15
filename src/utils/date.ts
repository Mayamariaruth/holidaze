import type { Booking } from '../types/booking.types';
import { isSameDay } from 'date-fns';

/**
 * Extracts all the booked dates from a list of bookings.
 *
 * This function returns all the dates between the booking's start and end date
 * for each booking in the provided list.
 *
 * @param {Booking[]} bookings Array of booking objects.
 * @returns {Date[]} Array of dates that are booked.
 *
 * @example
 * const bookedDates = getBookedDates(bookings);
 */
export function getBookedDates(bookings: Booking[]): Date[] {
  const dates: Date[] = [];

  bookings.forEach((b) => {
    const start = new Date(b.dateFrom);
    const end = new Date(b.dateTo);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
  });

  return dates;
}

/**
 * Checks if a specific date is available (not booked and not in the past).
 *
 * @param {Date} date The date to check.
 * @param {Booking[]} bookings List of bookings to compare against.
 * @returns {boolean} True if the date is available.
 *
 * @example
 * const available = isDateAvailable(new Date(), bookings);
 */
export function isDateAvailable(date: Date, bookings: Booking[]): boolean {
  const bookedDates = getBookedDates(bookings);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date >= today && !bookedDates.some((d) => isSameDay(d, date));
}

