import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth.stores';
import { getProfile } from '../../services/profiles.service';
import BookingCard from '../../components/cards/BookingCard';
import placeholder from '../../assets/images/placeholder.jpg';
import type { UserProfile, UserBooking } from '../../types/user.types';

export default function CustomerDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'bookings' | 'favorites'>('bookings');

  const { user } = useAuthStore();

  useEffect(() => {
    if (!user?.name) return;

    async function fetchProfile() {
      try {
        const data = await getProfile(user.name);

        const accountType = (data as any).venueManager ? 'venue_manager' : 'customer';
        setProfile({ ...data, accountType });
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    }

    fetchProfile();
  }, [user?.name]);

  return (
    <div className="dashboard-page">
      {/* Hero / Banner */}
      <div
        className="dashboard-banner py-5 mb-5 rounded-4"
        style={{ backgroundImage: `url(${profile?.banner?.url || placeholder})` }}
      >
        {/* Profile Card */}
        {profile && (
          <div className="profile-card bg-white p-5 rounded-4 position-relative">
            <div className="d-flex align-items-center gap-4">
              <img
                src={profile.avatar?.url || placeholder}
                alt={profile.avatar?.alt}
                className="profile-avatar"
              />
              <div>
                <h2 className="mb-1">{profile.name}</h2>
                <p className="mb-1">{profile.email}</p>
                <span className="badge bg-primary">
                  {profile.accountType === 'venue_manager' ? 'Venue Manager' : 'Customer'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs: Bookings / Favorites */}
      <div className="dashboard-content bg-white rounded-4 p-5">
        <div className="tabs mb-4 d-flex gap-3">
          <button
            className={`btn ${activeTab === 'bookings' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
          <button
            className={`btn ${activeTab === 'favorites' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'bookings' && (
            <div className="bookings-list d-flex flex-column gap-3">
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
            <div className="favorites-list d-flex flex-column gap-3">
              {profile?.favorites?.length ? (
                profile.favorites.map((fav) => (
                  <div key={fav.id} className="favorite-item p-3 border rounded">
                    {fav.name}
                  </div>
                ))
              ) : (
                <p>No favorites yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
