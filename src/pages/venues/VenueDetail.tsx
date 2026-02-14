import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth.stores';
import Calendar from '../../components/modals/Calendar';
import { endpoints } from '../../config/api';
import { apiFetch } from '../../utils/api';
import type { Venue, VenueMeta } from '../../types/venue.types';
import { useBookings } from '../../hooks/useBookings';
import EditVenue from '../../components/modals/EditVenue';

export default function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const { role, isAuthenticated } = useAuthStore();

  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const booking = useBookings(venue, isAuthenticated);

  useEffect(() => {
    if (!id) return;

    const fetchVenue = async () => {
      try {
        const data = await apiFetch<Venue>(`${endpoints.venues}/${id}?_bookings=true&_owner=true`);
        setVenue(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (isLoading) return <p className="container py-5">Loading venue…</p>;
  if (isError || !venue) return <p className="container py-5">Venue not found.</p>;

  const amenities: (keyof VenueMeta)[] = ['wifi', 'parking', 'breakfast', 'pets'];

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="breadcrumb mt-4 mb-5 ms-4 d-flex align-items-center gap-1">
        <Link to="/" className="text-decoration-none text-muted">
          Home
        </Link>
        <i className="fa-solid fa-angle-right text-muted"></i>
        <Link to="/venues" className="text-decoration-none text-muted">
          Venues
        </Link>
        <i className="fa-solid fa-angle-right text-muted"></i>
        <span className="active text-muted">{venue.name}</span>
      </nav>

      <div className="container mb-5 pt-3">
        {/* Title */}
        <div className="mb-4 text-center">
          <h1 className="mb-1">{venue.name}</h1>
          <div className="text-primary">{venue.rating}</div>
          <p className="text-neutral fw-medium h4">
            {venue.location.city}, {venue.location.country}
          </p>
        </div>

        {/* Image */}
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
              {venue.media?.slice(1, 5).map((img) => (
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
            <button className="btn btn-primary btn-edit" onClick={() => setShowEditModal(true)}>
              Edit
            </button>
          ) : (
            <button className="btn">
              <i className="fa-regular fa-heart me-2" /> Save
            </button>
          )}

          <span>
            Managed by <strong>{venue.owner?.name}</strong>
          </span>
        </div>

        {/* Description */}
        <div className="text-center mb-5">
          <h2 className="h3">About this venue</h2>
          <p>{venue.description}</p>
        </div>

        <div className="row g-5">
          {/* Left - Amenities + Location */}
          <div className="col-12 col-lg-7">
            <h3>Amenities</h3>
            <ul className="list-unstyled row">
              {amenities.map((amenity) => (
                <li key={amenity} className="col-6 mb-2">
                  <span className={venue.meta[amenity] ? 'text-success' : 'text-danger'}>
                    <i className={`fa-solid ${venue.meta[amenity] ? 'fa-check' : 'fa-xmark'}`}></i>
                  </span>{' '}
                  {amenity}
                </li>
              ))}
            </ul>

            <h3 className="mt-5">Location</h3>
            <div className="map-placeholder rounded-4 mb-3" />
            <p>
              {venue.location.address}, {venue.location.city}, {venue.location.zip}{' '}
              {venue.location.country}
            </p>
          </div>

          {/* Right - Booking Box */}
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
                  value={booking.dateFrom ? booking.dateFrom.toLocaleDateString() : ''}
                  onClick={() => setShowCalendar(true)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Check-out"
                  readOnly
                  value={booking.dateTo ? booking.dateTo.toLocaleDateString() : ''}
                  onClick={() => setShowCalendar(true)}
                />
              </div>

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Guests"
                min={1}
                max={venue.maxGuests}
                value={booking.guests}
                onChange={(e) =>
                  booking.setGuests(e.target.value === '' ? '' : Number(e.target.value))
                }
              />

              {booking.error && <p className="text-danger">{booking.error}</p>}
              {booking.success && <p className="text-success">Booking confirmed!</p>}

              <div className="d-flex justify-content-between align-items-center gap-5 mt-4">
                <strong>${venue.price}/night</strong>
                <button
                  className="btn btn-cta w-100"
                  disabled={
                    !booking.dateFrom || !booking.dateTo || booking.isSubmitting || !booking.guests
                  }
                  onClick={booking.book}
                >
                  {booking.isSubmitting ? 'Booking…' : 'Book'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar modal */}
        {showCalendar && (
          <Calendar
            bookings={venue.bookings ?? []}
            onClose={() => setShowCalendar(false)}
            onSelectRange={(from, to) => {
              booking.setDateFrom(from);
              booking.setDateTo(to);
            }}
          />
        )}

        {/* Edit venue modal */}
        {showEditModal && venue && (
          <EditVenue
            venue={venue}
            onClose={() => setShowEditModal(false)}
            onEdit={(updated) => setVenue(updated)}
          />
        )}
      </div>
    </div>
  );
}
