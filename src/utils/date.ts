export function getBookedDates(bookings: any[]) {
  const dates: string[] = [];

  bookings.forEach((booking) => {
    const start = new Date(booking.dateFrom);
    const end = new Date(booking.dateTo);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split('T')[0]);
    }
  });

  return dates;
}
