import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth.stores';
import Calendar from '../../components/modals/Calendar';
import { endpoints } from '../../config/api';
import { apiFetch } from '../../utils/api';
import type { Venue, VenueMeta } from '../../types/venue.types';
import { isOverlapping } from '../../utils/validation';

export default function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const { role, isAuthenticated } = useAuthStore();

  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const [guests, setGuests] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchVenue() {
      try {
        const data = await apiFetch<Venue>(`${endpoints.venues}/${id}?_bookings=true&_owner=true`);
        setVenue(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  async function handleBook() {
    if (!venue) return;

    if (!isAuthenticated) {
      setError('You must be logged in to book');
      return;
    }

    if (!dateFrom || !dateTo) {
      setError('Please select dates');
      return;
    }

    if (isOverlapping(dateFrom, dateTo, venue.bookings ?? [])) {
      setError('Selected dates are not available');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await apiFetch(endpoints.bookings, {
        method: 'POST',
        body: JSON.stringify({
          venueId: venue.id,
          dateFrom: dateFrom.toISOString(),
          dateTo: dateTo.toISOString(),
          guests,
        }),
      });

      setSuccess(true);
    } catch {
      setError('Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) return <p className="container py-5">Loading venue…</p>;
  if (isError || !venue) return <p className="container py-5">Venue not found.</p>;

  const amenities: (keyof VenueMeta)[] = ['wifi', 'parking', 'breakfast', 'pets'];

  return (
    <div className="container mb-5 pt-3">
      {/* Breadcrumb */}
      <nav className="breadcrumb mb-5">
        <Link to="/" className="text-decoration-none text-muted">
          Home /{' '}
        </Link>
        <Link to="/venues" className="text-decoration-none text-muted">
          Venues /{' '}
        </Link>
        <span className="active"> {venue.name}</span>
      </nav>

      {/* Title */}
      <div className="mb-4 text-center">
        <h1 className="mb-1">{venue.name}</h1>
        <div className="text-primary">{venue.rating}</div>
        <p className="text-neutral fw-medium h4">
          {venue.location?.city}, {venue.location?.country}
        </p>
      </div>

      {/* Image gallery */}
      <div className="row g-3">
        <div className="col-12 col-md-8 w-100">
          <img
            src={venue.media?.[0]?.url}
            className="img-fluid rounded-4 w-100"
            alt={venue.media?.[0]?.alt || venue.name}
          />
        </div>

        <div className="col-12 col-md-4">
          <div className="row g-2">
            {venue?.media?.slice(1, 5).map((img) => (
              <div className="col-6" key={img.url}>
                <img src={img.url} alt={img.alt ?? venue.name} className="img-fluid rounded-3" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit / Save */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {role === 'venue_manager' ? (
          <button className="btn btn-primary">Edit</button>
        ) : (
          <button className="btn">
            <i className="fa-regular fa-heart me-2" />
            Save
          </button>
        )}

        <span>
          Managed by <strong>{venue.owner?.name}</strong>
        </span>
      </div>

      {/* Description */}
      <div className="text-center mb-5">
        <h2 className="h3">About this venue</h2>
        <p className="mb-4">{venue.description}</p>
      </div>

      <div className="row g-5">
        {/* Left - Amenities + location */}
        <div className="col-12 col-lg-7">
          <h3>Amenities</h3>
          <ul className="list-unstyled row">
            {amenities.map((amenity) => {
              const hasAmenity = venue?.meta?.[amenity];

              return (
                <li key={amenity} className="col-6 mb-2">
                  <span className={hasAmenity ? 'text-success' : 'text-danger'}>
                    {hasAmenity ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i className="fa-solid fa-xmark"></i>
                    )}
                  </span>{' '}
                  {amenity}
                </li>
              );
            })}
          </ul>

          {/* Location */}
          <h3 className="mt-5">Location</h3>
          <div className="map-placeholder rounded-4 mb-3" />
          <p>
            {venue.location?.address}, {venue.location?.city}, {venue.location?.zip}{' '}
            {venue.location?.country}
          </p>
        </div>

        {/* Right – Booking box */}
        <div className="col-12 col-lg-5">
          <div className="booking-box rounded-4 p-4 sticky-top bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h3">Availability</h2>
              <span className="fw-medium">Max {venue.maxGuests} guests</span>
            </div>

            <div className="d-flex gap-2 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Check-in"
                readOnly
                value={dateFrom ? dateFrom.toLocaleDateString() : ''}
                onClick={() => setShowCalendar(true)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Check-out"
                readOnly
                value={dateTo ? dateTo.toLocaleDateString() : ''}
                onClick={() => setShowCalendar(true)}
              />
            </div>

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Guests"
              min={1}
              max={venue.maxGuests}
              value={guests}
              onChange={(e) => setGuests(e.target.value === '' ? '' : Number(e.target.value))}
            />

            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">Booking confirmed!</p>}

            <div className="d-flex justify-content-between align-items-center gap-5 mt-4">
              <strong>${venue.price}/night</strong>
              <button
                className="btn btn-cta w-100"
                disabled={!dateFrom || !dateTo || isSubmitting || !guests}
                onClick={handleBook}
              >
                {isSubmitting ? 'Booking…' : 'Book'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCalendar && (
        <Calendar
          bookings={venue.bookings ?? []}
          onClose={() => setShowCalendar(false)}
          onSelectRange={(from, to) => {
            setDateFrom(from);
            setDateTo(to);
          }}
        />
      )}
    </div>
  );
}
