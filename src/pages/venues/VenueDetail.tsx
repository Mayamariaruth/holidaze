import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth.stores';
import Calendar from '../../components/modals/Calendar';
import { endpoints } from '../../config/api';
import { apiFetch } from '../../utils/api';
import type { Venue, VenueMeta } from '../../types/venue.types';

export default function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const { role } = useAuthStore();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

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

  if (isLoading) return <p className="container py-5">Loading venue…</p>;
  if (isError || !venue) return <p className="container py-5">Venue not found.</p>;

  const amenities: (keyof VenueMeta)[] = ['wifi', 'parking', 'breakfast', 'pets'];

  return (
    <div className="container py-5">
      {/* Breadcrumb */}
      <nav className="breadcrumb mb-4">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/venues">Venues</Link>
        <span>/</span>
        <span className="active">{venue.name}</span>
      </nav>

      {/* Title */}
      <div className="mb-4">
        <h1 className="mb-1">{venue.name}</h1>
        <div className="text-warning">★ {venue.rating}</div>
        <span className="text-muted">
          {venue.location?.city}, {venue.location?.country}
        </span>
      </div>

      {/* Image gallery */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-8">
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
                <img src={img.url} alt={img.alt ?? venue.name} className="img-fluid" />
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
          <button className="btn btn-outline-secondary">
            <i className="fa-regular fa-heart me-2" />
            Save
          </button>
        )}

        <span>
          Managed by <strong>{venue.owner?.name}</strong>
        </span>
      </div>

      {/* Description */}
      <p className="mb-4">{venue.description}</p>

      <div className="row g-5">
        {/* Left - Amenities + location */}
        <div className="col-12 col-lg-7">
          <h2 className="h3">Amenities</h2>
          <ul className="list-unstyled row">
            {amenities.map((amenity) => {
              const hasAmenity = venue?.meta?.[amenity];

              return (
                <li key={amenity} className="col-6 mb-2">
                  <span className={hasAmenity ? 'text-success' : 'text-danger'}>
                    {hasAmenity ? '✔' : '✕'}
                  </span>{' '}
                  {amenity}
                </li>
              );
            })}
          </ul>

          {/* Location */}
          <h2 className="h3 mt-5">Location</h2>
          <div className="map-placeholder rounded-4 mb-3" />
          <p>
            {venue.location?.address}, {venue.location?.city}, {venue.location?.zip}{' '}
            {venue.location?.country}
          </p>
        </div>

        {/* Right – Booking box */}
        <div className="col-12 col-lg-5">
          <div className="border rounded-4 p-4 sticky-top">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h3">Availability</h2>
              <span className="text-muted">Max {venue.maxGuests} guests</span>
            </div>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Check in – Check out"
              readOnly
              onClick={() => setShowCalendar(true)}
            />
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Guests"
              min={1}
              max={venue.maxGuests}
            />
            <p className="text-muted small">
              Select your dates and number of guests to check availability and complete your
              booking.
            </p>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <strong>${venue.price}/night</strong>
              <button className="btn btn-cta">Book</button>
            </div>
          </div>
        </div>
      </div>

      {showCalendar && <Calendar venue={venue} onClose={() => setShowCalendar(false)} />}
    </div>
  );
}
