import { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateVenue from '../../components/modals/CreateVenue';
import EditVenue from '../../components/modals/EditVenue';
import DeleteVenue from '../../components/modals/DeleteVenue';
import ManagerBookings from '../../components/modals/ManagerBookings';
import type { UserProfile } from '../../types/user.types';
import type { Venue } from '../../types/venue.types';

interface Props {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  setGlobalAlert: React.Dispatch<
    React.SetStateAction<{ type: 'success' | 'danger'; message: string } | null>
  >;
}

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
 * - Maintains state for modals: CreateVenue, EditVenue, DeleteVenue, ManagerBookings.
 * - Updates the local profile state when venues are created, edited, or deleted.
 * - Shows global alert messages for success/failure of venue operations.
 * - Each venue card displays basic info, location, and buttons for bookings, edit, delete.
 */
export default function ManagerDashboard({ profile, setProfile, setGlobalAlert }: Props) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editVenue, setEditVenue] = useState<Venue | null>(null);
  const [deleteVenueId, setDeleteVenueId] = useState<string | null>(null);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  // Add a new venue to the profile state
  const handleCreateVenue = (venue: Venue) => {
    setProfile((prev) => ({
      ...prev!,
      venues: prev?.venues ? [...prev.venues, venue] : [venue],
    }));
  };

  // Remove a venue from profile state after deletion
  const handleDeleteVenue = (id: string) => {
    setProfile((prev) => ({
      ...prev!,
      venues: prev?.venues?.filter((v) => v.id !== id) || [],
    }));
  };

  return (
    <>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Venues</h2>
        <button className="btn btn-primary btn-create" onClick={() => setShowCreateModal(true)}>
          Create venue
        </button>
      </div>
      <hr />

      {/* Venues list */}
      <div className="d-flex flex-column gap-4 mt-4">
        {profile.venues?.length ? (
          profile.venues.map((venue) => {
            const fullAddress = venue.location
              ? [
                  venue.location.address,
                  venue.location.city,
                  venue.location.zip,
                  venue.location.country,
                ]
                  .filter(Boolean)
                  .join(', ')
              : 'No location available';

            return (
              <div
                key={venue.id}
                className="venue-card box-shadow bg-light p-4 rounded-3 d-flex flex-column flex-md-row gap-4"
              >
                <div className="flex-shrink-0 venue-img">
                  <img
                    className="img-fluid rounded w-100 h-100"
                    src={venue.media?.[0]?.url || '/placeholder.jpg'}
                    alt={venue.media?.[0]?.alt || venue.name}
                  />
                </div>
                <div className="flex-grow-1 d-flex flex-column flex-md-row justify-between gap-3">
                  <div className="flex-grow-1">
                    <Link to={`/venues/${venue.id}`} className="text-dark text-decoration-none">
                      <h4>{venue.name}</h4>
                    </Link>
                    <p className="text-muted">{fullAddress}</p>
                    <button
                      className="btn-bookings fw-semibold mt-2"
                      onClick={() => setSelectedVenueId(venue.id)}
                    >
                      See bookings
                    </button>
                  </div>
                  <div className="d-flex flex-row flex-md-column gap-2 btn-container">
                    <button
                      className="btn btn-cancel flex-fill"
                      onClick={() => setEditVenue(venue)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger flex-fill"
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
          <p>No venues created yet.</p>
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
            setProfile((prev) => ({
              ...prev!,
              venues: prev!.venues!.map((v) => (v.id === updated.id ? updated : v)),
            }));
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
            handleDeleteVenue(id);
            setDeleteVenueId(null);
            setGlobalAlert({ type: 'success', message: 'Venue deleted successfully!' });
          }}
        />
      )}

      {selectedVenueId && (
        <ManagerBookings venueId={selectedVenueId} onClose={() => setSelectedVenueId(null)} />
      )}
    </>
  );
}
