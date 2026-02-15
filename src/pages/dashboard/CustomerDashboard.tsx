import BookingCard from '../../components/cards/BookingCard';
import type { UserProfile } from '../../types/user.types';
import type { UserBooking } from '../../types/booking.types';

interface Props {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  setGlobalAlert: React.Dispatch<
    React.SetStateAction<{ type: 'success' | 'danger'; message: string } | null>
  >;
}

/**
 * Customer Dashboard page component.
 *
 * Displays a list of bookings for the logged-in customer.
 *
 * @component
 * @example
 * <CustomerDashboard />
 *
 * @remarks
 * - Fetches the customer's profile using `getProfile` from the API.
 * - Each booking is rendered with `BookingCard`.
 * - Simple layout with header, bookings list, and message if no bookings exist.
 */
export default function CustomerDashboard({ profile }: Props) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Bookings</h2>
      </div>
      <hr />
      <div className="mt-4 d-flex flex-column gap-3">
        {profile.bookings?.length ? (
          profile.bookings.map((booking: UserBooking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <p>No bookings yet.</p>
        )}
      </div>
    </>
  );
}
