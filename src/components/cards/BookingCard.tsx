import { Link } from 'react-router-dom';
import type { UserBooking } from '../../types/booking.types';
import placeholder from '../../assets/images/placeholder.jpg';

interface Props {
  booking: UserBooking;
  isManagerView?: boolean;
}

export default function BookingCard({ booking, isManagerView = false }: Props) {
  const venue = booking.venue;
  const location = venue?.location;
  const image = venue?.media?.[0];

  const fullAddress = location
    ? [location.address, location.city, location.zip, location.country].filter(Boolean).join(', ')
    : 'No location available';

  const title = isManagerView
    ? typeof booking.customer === 'string'
      ? booking.customer
      : booking.customer?.name || 'Unknown customer'
    : venue?.name || 'Unknown venue';
  const locationLine = isManagerView ? venue?.name || 'Unknown venue' : fullAddress;

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
        {/* Title + price */}
        <div className="d-flex justify-content-between mb-1 flex-wrap">
          {isManagerView ? (
            <p className="booking-font mb-0">
              Customer: <span className="fw-bold mb-0">{title}</span>
            </p>
          ) : (
            <Link
              to={`/venues/${venue?.id}`}
              className="booking-font fw-bold mb-0 text-decoration-none text-dark"
            >
              {title}
            </Link>
          )}

          <p className="fw-semibold mb-0">
            {venue?.price ? `$${venue.price}/night` : 'No price available'}
          </p>
        </div>

        {/* Location + guests */}
        <div className="d-flex justify-content-between mb-2 flex-column flex-md-row">
          <p className="text-muted mb-1 mb-md-0">{locationLine}</p>
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
