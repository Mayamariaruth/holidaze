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
      <div className="row g-4 mt-3">
        {profile?.venues && profile.venues.length > 0 ? (
          profile.venues.map((venue) => {
            const location = venue.location;
            const fullAddress = location
              ? [location.address, location.city, location.zip, location.country]
                  .filter(Boolean)
                  .join(', ')
              : 'No location available';

            return (
              <div key={venue.id} className="col-md-4">
                <div className="card h-100 box-shadow">
                  {venue.media?.[0]?.url && (
                    <img
                      src={venue.media[0].url}
                      className="card-img-top"
                      alt={venue.media[0].alt || venue.name}
                    />
                  )}
                  <div className="card-body">
                    <h4 className="card-title">{venue.name}</h4>
                    <p className="text-muted mb-1 mb-md-0">{fullAddress}</p>
                    <button className="text-decoration-underline mt-2">See bookings</button>
                  </div>
                  <div className="d-flex gap-2 p-2">
                    <button className="btn btn-cancel">Edit</button>
                    <button className="btn btn-danger">Delete</button>
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
