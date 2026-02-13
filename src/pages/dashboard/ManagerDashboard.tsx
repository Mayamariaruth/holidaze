import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth.stores';
import { getProfile } from '../../services/profiles.service';
import Dashboard from '../../components/layout/Dashboard';
import CreateVenue from '../../components/modals/CreateVenue';
import type { UserProfile } from '../../types/user.types';
import type { Venue } from '../../types/venue.types';

export default function ManagerDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
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

  const handleCreateVenue = async (venue: Venue) => {
    setProfile((prev) => ({
      ...prev!,
      venues: prev?.venues ? [...prev.venues, venue] : [venue],
    }));
  };

  return (
    <Dashboard profile={profile} setProfile={setProfile}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="h2">Venues</p>
        <button className="btn btn-primary btn-create" onClick={() => setShowCreateModal(true)}>
          Create venue
        </button>
      </div>
      <hr />

      {/* Venue list */}
      <div className="d-flex flex-column gap-4 mt-4">
        {profile?.venues && profile.venues.length > 0 ? (
          profile.venues.map((venue) => {
            const location = venue.location;
            const fullAddress = location
              ? [location.address, location.city, location.zip, location.country]
                  .filter(Boolean)
                  .join(', ')
              : 'No location available';

            return (
              <div
                key={venue.id}
                className="venue-card bg-light p-4 rounded-3 box-shadow d-flex flex-column flex-md-row gap-4"
              >
                {/* Image */}
                <div className="flex-shrink-0 venue-img">
                  <img
                    className="img-fluid rounded object-fit-cover w-100 h-100"
                    src={venue.media?.[0]?.url || '/placeholder.jpg'}
                    alt={venue.media?.[0]?.alt || venue.name}
                  />
                </div>

                {/* Content */}
                <div className="flex-grow-1 d-flex flex-column flex-md-row justify-between gap-3">
                  {/* Content */}
                  <div className="flex-grow-1">
                    <h4 className="mb-1">{venue.name}</h4>
                    <p className="text-muted mb-2">{fullAddress}</p>
                    <button className="btn-bookings fw-semibold mt-4">See bookings</button>
                  </div>

                  {/* Buttons */}
                  <div className="btn-container d-flex flex-row flex-md-column gap-2">
                    <button className="btn btn-cancel flex-grow-1">Edit</button>
                    <button className="btn btn-danger flex-grow-1">Delete</button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-muted mt-3">No venues created yet.</p>
        )}
      </div>

      {/* Create Venue Modal */}
      {showCreateModal && (
        <CreateVenue onClose={() => setShowCreateModal(false)} onCreate={handleCreateVenue} />
      )}
    </Dashboard>
  );
}
