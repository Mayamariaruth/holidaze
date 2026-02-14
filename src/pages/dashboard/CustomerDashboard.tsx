import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth.stores';
import { getProfile } from '../../services/profiles.service';
import Dashboard from '../../components/layout/Dashboard';
import BookingCard from '../../components/cards/BookingCard';
import type { UserProfile } from '../../types/user.types';
import type { UserBooking } from '../../types/booking.types';

export default function CustomerDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const { user } = useAuthStore();

  useEffect(() => {
    if (!user?.name) return;

    const { name } = user;

    async function fetchProfile() {
      try {
        const data = await getProfile(name);
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProfile();
  }, [user]);

  return (
    <Dashboard profile={profile} setProfile={setProfile}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Bookings</h2>
      </div>
      <hr />

      <div className="mt-5">
        <div className="d-flex flex-column gap-3">
          {profile?.bookings?.length ? (
            profile.bookings.map((booking: UserBooking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <p>No bookings yet.</p>
          )}
        </div>
      </div>
    </Dashboard>
  );
}
