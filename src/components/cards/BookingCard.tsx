import { Link } from 'react-router-dom';
import type { UserBooking } from '../../types/user.types';
import placeholder from '../../assets/images/placeholder.jpg';

interface Props {
  booking: UserBooking;
}

export default function BookingCard({ booking }: Props) {
  const location = booking.venue?.location;

  const formattedAddress = location
    ? [location.address, location.city, location.zip, location.country].filter(Boolean).join(', ')
    : '';

  const fullAddress = formattedAddress || 'No location available';

  return (
    <div className="booking-card bg-light p-4 rounded-3 box-shadow d-flex flex-column flex-md-row gap-4">
      {/* Image */}
      <div className="flex-shrink-0 booking-img">
        <img
          className="img-fluid rounded object-fit-cover"
          src={booking.venue?.media?.url || placeholder}
          alt={booking.venue?.media?.alt || booking.venue?.name}
        />
      </div>

      {/* Content */}
      <div className="flex-grow-1 d-flex flex-column justify-between">
        {/* Venue name and price */}
        <div className="d-flex justify-content-between mb-1 flex-wrap">
          <Link
            to={`/venues/${booking.venue?.id}`}
            className="booking-font fw-bold mb-0 text-decoration-none text-dark"
          >
            {booking.venue?.name}
          </Link>

          <p className="fw-semibold mb-0">
            {booking.venue?.price ? `$${booking.venue.price}/night` : 'No price available'}
          </p>
        </div>

        {/* Address and guests */}
        <div className="d-flex justify-content-between mb-2 flex-column flex-md-row">
          <p className="text-muted mb-1 mb-md-0">{fullAddress}</p>
          <p className="mb-0 fw-medium">{booking.guests} Guests</p>
        </div>

        <hr className="my-2" />

        {/* Check-in */}
        <div className="d-flex justify-content-between mb-1 flex-wrap">
          <p className="mb-0">Check-in</p>
          <p className="mb-0">{new Date(booking.dateFrom).toLocaleDateString()}</p>
        </div>

        {/* Check-out */}
        <div className="d-flex justify-content-between">
          <p className="mb-0">Check-out</p>
          <p className="mb-0">{new Date(booking.dateTo).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
