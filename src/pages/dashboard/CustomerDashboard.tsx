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
    if (!user) return;
    const { name } = user;

    async function fetchProfile() {
      try {
        const data = await getProfile(name);
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    }

    fetchProfile();
  }, [user]);

  return (
    <div className="dashboard-page">
      {/* Hero / Banner */}
      <div
        className="dashboard-banner py-5 mb-5 rounded-4"
        style={{ backgroundImage: `url(${profile?.banner?.url || placeholder})` }}
      >
        {/* Profile Card */}
        {profile && (
          <div className="profile-card bg-white p-3 p-md-5 rounded-4 position-relative">
            <div className="d-flex flex-column align-items-center gap-4">
              <img
                src={profile.avatar?.url || placeholder}
                alt={profile.avatar?.alt}
                className="profile-avatar rounded-4"
              />
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <p className="fw-medium profile-label">Name</p>
                  <p className="mb-1">{profile.name}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fw-medium profile-label">Email</p>
                  <p>{profile.email}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fw-medium profile-label">Account type</p>
                  <p>{profile.venueManager ? 'Venue Manager' : 'Customer'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs: Bookings / Favorites */}
      <div className="dashboard-content bg-white rounded-4 p-3 p-md-5 mb-5">
        <div className="tabs mb-4 d-flex">
          <button
            className={`btn ${activeTab === 'bookings' ? 'btn-primary box-shadow' : 'btn-tab'}`}
            onClick={() => setActiveTab('bookings')}
          >
            <h4>Bookings</h4>
          </button>
          <button
            className={`btn ${activeTab === 'favorites' ? 'btn-primary box-shadow' : 'btn-tab'}`}
            onClick={() => setActiveTab('favorites')}
          >
            <h4>Favorites</h4>
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
      </div>
    </div>
  );
}
