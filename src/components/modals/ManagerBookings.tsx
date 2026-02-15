import { useEffect, useState } from 'react';
import BookingCard from '../cards/BookingCard';
import type { UserBooking } from '../../types/booking.types';
import { fetchVenueById } from '../../services/venues.service';

interface Props {
  venueId: string;
  onClose: () => void;
}

/**
 * Modal for a manager to view all bookings for a specific venue.
 *
 * Fetches bookings for the given venue ID and displays them using BookingCard components.
 *
 * @param {Object} props
 * @param {string} props.venueId The ID of the venue to fetch bookings for
 * @param {() => void} props.onClose Callback to close the modal
 * @returns {JSX.Element} Modal component showing venue bookings
 */
export default function ManagerBookings({ venueId, onClose }: Props) {
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetch venue data and extract bookings.
     * Adds a fallback for missing customer info.
     */
    async function loadBookings() {
      setLoading(true);
      try {
        const venue = await fetchVenueById(venueId);

        const venueBookings: UserBooking[] = (venue.bookings || []).map((b) => ({
          ...b,
          customer: b.customer || { name: venue.owner?.name || 'Unknown customer' },
          venue: {
            id: venue.id,
            name: venue.name,
            price: venue.price,
            location: venue.location,
            media: venue.media,
          },
        }));

        setBookings(venueBookings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, [venueId]);

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="manager-bookings-modal-label"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered manager-bookings-modal">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h2 className="modal-title" id="manager-bookings-modal-label">
                Bookings
              </h2>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            {/* Bookings list */}
            <div className="mt-3 d-flex flex-column gap-3 p-2">
              {loading ? (
                <p className="text-center mt-2">Loading bookings...</p>
              ) : bookings.length > 0 ? (
                bookings.map((b) => <BookingCard key={b.id} booking={b} isManagerView />)
              ) : (
                <p className="text-muted text-center mt-2">No bookings yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
