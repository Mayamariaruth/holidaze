import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth.stores';
import Calendar from '../../components/modals/Calendar';
import type { Venue, VenueMeta } from '../../types/venue.types';
import { useBookings } from '../../hooks/useBookings';
import EditVenue from '../../components/modals/EditVenue';
import VenueMap from '../../components/ui/VenueMap';
import Alert from '../../components/ui/Alert';
import Loader from '../../components/ui/Loader';
import { fetchVenueById } from '../../services/venues.service';
import placeholder from '../../assets/images/placeholder.jpg';

/**
 * VenueDetail page component.
 * Displays detailed information about a venue, including:
 * - Name, rating, location
 * - Images
 * - Amenities
 * - Map location
 * - Booking interface
 * - Edit modal for venue managers
 *
 * @returns {JSX.Element} Venue detail page
 */
export default function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const { role, isAuthenticated, user } = useAuthStore();

  // Global alerts for booking success/error
  const [globalAlert, setGlobalAlert] = useState<{
    type: 'success' | 'danger';
    message: string;
  } | null>(null);

  // Venue data
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Modals
  const [showCalendar, setShowCalendar] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Booking hook
  const booking = useBookings(venue, isAuthenticated);

  /**
   * Update global alert when booking status changes
   */
  useEffect(() => {
    if (booking.success) {
      setGlobalAlert({ type: 'success', message: 'Your booking was successful!' });
    } else if (booking.error) {
      setGlobalAlert({ type: 'danger', message: booking.error });
    }
  }, [booking.success, booking.error]);

  /**
   * Fetch venue data by ID
   */
  useEffect(() => {
    if (!id) return;

    const fetchVenue = async () => {
      try {
        const data = await fetchVenueById(id);
        setVenue(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  // Early returns for loading/error states
  if (isLoading) return <Loader overlay size="lg" />;
  if (isError || !venue)
    return <div className="container py-5 text-center text-danger">Venue not found.</div>;

  // List of amenities keys for display
  const amenities: (keyof VenueMeta)[] = ['wifi', 'parking', 'breakfast', 'pets'];

  /**
   * Booking handler
   */
  const handleBooking = async () => {
    await booking.book();
  };

  const isOwner = venue.owner?.name === user?.name;

  return (
    <div>
      {/* Global alert */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        {globalAlert && (
          <Alert
            type={globalAlert.type}
            message={globalAlert.message}
            onClose={() => setGlobalAlert(null)}
            autoDismiss={5000}
          />
        )}
      </div>

      {/* Breadcrumb navigation */}
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
        {/* Venue title, rating, and location */}
        <div className="mb-4 text-center">
          <h1 className="mb-1">{venue.name}</h1>
          <div className="fw-bold rating-size">
            {venue.rating !== undefined ? `⭐ ${venue.rating}/5` : 'No ratings'}
          </div>
          <p className="text-neutral fw-medium h4 mt-3">
            {venue.location.city}, {venue.location.country}
          </p>
        </div>

        {/* Image */}
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-8 w-100">
            <img
              src={venue.media?.[0]?.url || placeholder}
              className="img-fluid rounded-4 w-100"
              alt={venue.media?.[0]?.alt || venue.name}
            />
          </div>
        </div>

        {/* Edit button & owner info */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          {role === 'venue_manager' && isOwner && (
            <button className="btn btn-primary btn-edit" onClick={() => setShowEditModal(true)}>
              Edit
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

        <div className="row g-5 justify-content-between">
          {/* Left column: Amenities + Map */}
          <div className="col-12 col-lg-6 order-2 order-lg-1">
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

            {/* Map + full address */}
            <div className="mt-5">
              <h3>Location</h3>
              <div className="bg-white rounded-4 pb-2">
                <VenueMap name={venue.name} location={venue.location} />
                <p className="ps-3">
                  {venue.location.address}, {venue.location.city}, {venue.location.zip}{' '}
                  {venue.location.country}
                </p>
              </div>
            </div>
          </div>

          {/* Right column: Booking box */}
          <div className="col-12 col-lg-6 order-1 order-lg-2">
            <div className="booking-box rounded-4 p-4 p-lg-5 sticky-top bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h3">Availability</h2>
                <span className="fw-medium">Max {venue.maxGuests} guests</span>
              </div>

              {/* Check-in / Check-out */}
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

              {/* Guests input */}
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

              {/* Booking feedback */}
              {booking.error && <p className="text-danger">{booking.error}</p>}
              {booking.success && <p className="text-success">Booking confirmed!</p>}

              {/* Price & Book button */}
              <div className="d-flex justify-content-between align-items-center gap-5 mt-4">
                <strong>${venue.price}/night</strong>
                <button
                  className="btn btn-cta w-100"
                  disabled={
                    !booking.dateFrom || !booking.dateTo || booking.isSubmitting || !booking.guests
                  }
                  onClick={handleBooking}
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

        {/* Edit modal */}
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
