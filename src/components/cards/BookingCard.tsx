import type { UserBooking } from '../../types/user.types';

interface Props {
  booking: UserBooking;
}

export default function BookingCard({ booking }: Props) {
  return (
    <div className="booking-card p-4 border rounded shadow-sm d-flex justify-content-between align-items-center">
      <div>
        <h5>{booking.venue.name}</h5>
        <p>Date: {new Date(booking.dateFrom).toLocaleDateString()}</p>
        <p>Date: {new Date(booking.dateTo).toLocaleDateString()}</p>
        <p>Guests: {booking.guests}</p>
      </div>
      <span className={`badge ${booking.status === 'confirmed' ? 'bg-success' : 'bg-secondary'}`}>
        {booking.status}
      </span>
    </div>
  );
}
