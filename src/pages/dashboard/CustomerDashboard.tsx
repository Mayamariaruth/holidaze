import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth.stores';
import { getProfile } from '../../services/profiles.service';
import Dashboard from '../../components/layout/Dashboard';
import BookingCard from '../../components/cards/BookingCard';
import type { UserProfile, UserBooking } from '../../types/user.types';

export default function CustomerDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'bookings' | 'favorites'>('bookings');

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
    <Dashboard profile={profile}>
      {/* Tabs */}
      <div className="tabs mb-4 d-flex">
        <button
          className={`btn ${activeTab === 'bookings' ? 'btn-primary box-shadow' : 'btn-tab'}`}
          onClick={() => setActiveTab('bookings')}
        >
          <p className="h4">Bookings</p>
        </button>

        <button
          className={`btn ${activeTab === 'favorites' ? 'btn-primary box-shadow' : 'btn-tab'}`}
          onClick={() => setActiveTab('favorites')}
        >
          <p className="h4">Favorites</p>
        </button>
      </div>

      <div className="mt-5">
        {activeTab === 'bookings' && (
          <div className="d-flex flex-column gap-3">
            {profile?.bookings?.length ? (
              profile.bookings.map((booking: UserBooking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <p>No bookings yet.</p>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="d-flex flex-column gap-3">
            {profile?.favorites?.length ? (
              profile.favorites.map((fav) => (
                <div key={fav.id} className="favorite-item p-3">
                  {fav.name}
                </div>
              ))
            ) : (
              <p>No favorites yet.</p>
            )}
          </div>
        )}
      </div>
    </Dashboard>
  );
}
