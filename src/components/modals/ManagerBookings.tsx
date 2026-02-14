import BookingCard from '../cards/BookingCard';
import type { UserBooking } from '../../types/booking.types';

interface Props {
  bookings: UserBooking[];
  onClose: () => void;
}

export default function ManagerBookings({ bookings, onClose }: Props) {
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h2 className="modal-title" id="manager-bookings-modal-label">
                Bookings
              </h2>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="manager-bookings-container d-flex flex-column gap-3 p-2">
              {bookings.length > 0 ? (
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
