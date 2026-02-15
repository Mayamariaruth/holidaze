import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.stores';
import { getProfile } from '../../services/profiles.service';
import Dashboard from '../../components/layout/Dashboard';
import CreateVenue from '../../components/modals/CreateVenue';
import type { UserProfile } from '../../types/user.types';
import type { Venue } from '../../types/venue.types';
import DeleteVenue from '../../components/modals/DeleteVenue';
import EditVenue from '../../components/modals/EditVenue';
import ManagerBookings from '../../components/modals/ManagerBookings';

/**
 * Manager Dashboard page component.
 *
 * Displays a list of venues owned by the logged-in venue manager.
 * Allows creating, editing, and deleting venues.
 * Provides access to view bookings for each venue.
 *
 * @component
 * @example
 * <ManagerDashboard />
 *
 * @remarks
 * - Fetches the manager's profile using `getProfile` from the API.
 * - Maintains state for modals: CreateVenue, EditVenue, DeleteVenue, ManagerBookings.
 * - Updates the local profile state when venues are created, edited, or deleted.
 * - Shows global alert messages for success/failure of venue operations.
 * - Each venue card displays basic info, location, and buttons for bookings, edit, delete.
 */
export default function ManagerDashboard() {
  // States for CRUD actions
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteVenueId, setDeleteVenueId] = useState<string | null>(null);
  const [editVenue, setEditVenue] = useState<Venue | null>(null);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  // Global alerts for booking success/error
  const [globalAlert, setGlobalAlert] = useState<{
    type: 'success' | 'danger';
    message: string;
  } | null>(null);

  const { user } = useAuthStore();

  // Fetch manager's profile with venues
  useEffect(() => {
    if (!user?.name) return;
    const { name } = user;

    async function fetchProfile() {
      setLoading(true);
      try {
        const data = await getProfile(name);
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  // Add a new venue to the profile state
  const handleCreateVenue = (venue: Venue) => {
    setProfile((prev) => ({
      ...prev!,
      venues: prev?.venues ? [...prev.venues, venue] : [venue],
    }));
  };

  // Remove a venue from profile state after deletion
  const handleVenueDelete = (id: string) => {
    setProfile((prev) => ({
      ...prev!,
      venues: prev?.venues?.filter((v) => v.id !== id) || [],
    }));
  };

  return (
    <Dashboard
      profile={profile}
      setProfile={setProfile}
      globalAlert={globalAlert}
      setGlobalAlert={setGlobalAlert}
      loading={loading}
    >
      {/* Header with Create button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Venues</h2>
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

                {/* Venue details and buttons */}
                <div className="flex-grow-1 d-flex flex-column flex-md-row justify-between gap-3">
                  <div className="flex-grow-1">
                    <Link to={`/venues/${venue?.id}`} className="text-dark text-decoration-none">
                      <h4 className="mb-1">{venue.name}</h4>
                    </Link>
                    <p className="text-muted mb-2">{fullAddress}</p>
                    <button
                      className="btn-bookings fw-semibold mt-4"
                      onClick={() => setSelectedVenueId(venue.id)}
                    >
                      See bookings
                    </button>
                  </div>

                  {/* Edit & Delete buttons */}
                  <div className="btn-container d-flex flex-row flex-md-column gap-2">
                    <button
                      className="btn btn-cancel flex-grow-1"
                      onClick={() => setEditVenue(venue)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger flex-grow-1"
                      onClick={() => setDeleteVenueId(venue.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-muted mt-3">No venues created yet.</p>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateVenue
          onClose={() => setShowCreateModal(false)}
          onCreate={(venue) => {
            handleCreateVenue(venue);
            setShowCreateModal(false);
            setGlobalAlert({ type: 'success', message: 'Venue created successfully!' });
          }}
        />
      )}

      {editVenue && (
        <EditVenue
          venue={editVenue}
          onClose={() => setEditVenue(null)}
          onEdit={(updated) => {
            setProfile((prev) => {
              if (!prev || !prev.venues) return prev;
              return {
                ...prev,
                venues: prev.venues.map((v) => (v.id === updated.id ? updated : v)),
              };
            });

            setEditVenue(null);
            setGlobalAlert({ type: 'success', message: 'Venue updated successfully!' });
          }}
        />
      )}

      {deleteVenueId && (
        <DeleteVenue
          venueId={deleteVenueId}
          onClose={() => setDeleteVenueId(null)}
          onDelete={(id) => {
            handleVenueDelete(id);
            setDeleteVenueId(null);
            setGlobalAlert({ type: 'success', message: 'Venue deleted successfully!' });
          }}
        />
      )}

      {selectedVenueId && (
        <ManagerBookings venueId={selectedVenueId} onClose={() => setSelectedVenueId(null)} />
      )}
    </Dashboard>
  );
}
