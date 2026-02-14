import { Link } from 'react-router-dom';
import type { UserBooking } from '../../types/booking.types';
import placeholder from '../../assets/images/placeholder.jpg';

interface Props {
  booking: UserBooking;
}

export default function BookingCard({ booking }: Props) {
  const venue = booking.venue;
  const location = venue?.location;
  const image = venue?.media?.[0];

  const fullAddress = location
    ? [location.address, location.city, location.zip, location.country].filter(Boolean).join(', ')
    : 'No location available';

  return (
    <div className="booking-card bg-light p-4 rounded-3 box-shadow d-flex flex-column flex-md-row gap-4">
      {/* Image */}
      <div className="flex-shrink-0 booking-img">
        <img
          className="img-fluid rounded object-fit-cover"
          src={image?.url || placeholder}
          alt={image?.alt || venue?.name || 'Venue image'}
        />
      </div>

      {/* Content */}
      <div className="flex-grow-1 d-flex flex-column justify-between">
        {/* Venue name + price */}
        <div className="d-flex justify-content-between mb-1 flex-wrap">
          {venue ? (
            <Link
              to={`/venues/${venue.id}`}
              className="booking-font fw-bold mb-0 text-decoration-none text-dark"
            >
              {venue.name}
            </Link>
          ) : (
            <p className="fw-bold mb-0">Unknown venue</p>
          )}

          <p className="fw-semibold mb-0">
            {venue?.price ? `$${venue.price}/night` : 'No price available'}
          </p>
        </div>

        {/* Address + guests */}
        <div className="d-flex justify-content-between mb-2 flex-column flex-md-row">
          <p className="text-muted mb-1 mb-md-0">{fullAddress}</p>
          <p className="mb-0 fw-medium">{booking.guests} Guests</p>
        </div>

        <hr className="my-2" />

        {/* Dates */}
        <div className="d-flex justify-content-between mb-1">
          <p className="mb-0">Check-in</p>
          <p className="mb-0">{new Date(booking.dateFrom).toLocaleDateString()}</p>
        </div>

        <div className="d-flex justify-content-between">
          <p className="mb-0">Check-out</p>
          <p className="mb-0">{new Date(booking.dateTo).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
