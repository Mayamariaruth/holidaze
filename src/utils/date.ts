import type { Booking } from '../types/booking.types';

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

    // Loop through each day between the start and end dates
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
  });

  return dates;
}
