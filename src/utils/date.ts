import type { Booking } from '../types/booking.types';

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
