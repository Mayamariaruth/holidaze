import { useState } from 'react';
import { deleteVenue } from '../../services/venues.service';
import Loader from '../ui/Loader';

/**
 * Modal component to confirm and delete a venue.
 *
 * Displays a confirmation modal with "Cancel" and "Delete" buttons.
 * Shows a loader while the deletion is in progress.
 *
 * @param {Object} props Component props
 * @param {string} props.venueId The ID of the venue to delete
 * @param {() => void} props.onClose Callback to close the modal
 * @param {(id: string) => void} props.onDelete Callback triggered after successful deletion
 * @returns {JSX.Element} Modal element for venue deletion
 *
 * @example
 * <DeleteVenue
 *   venueId="123"
 *   onClose={() => setShowModal(false)}
 *   onDelete={(id) => console.log(`Deleted venue ${id}`)}
 * />
 */
interface Props {
  venueId: string;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function DeleteVenue({ venueId, onClose, onDelete }: Props) {
  // Loading state for async delete operation
  const [loading, setLoading] = useState(false);

  /**
   * Handles venue deletion.
   * Calls API, triggers parent callbacks, and manages loading state.
   */
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteVenue(venueId);
      onDelete(venueId);
      onClose();
    } catch (err) {
      console.error('Failed to delete venue', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modal backdrop */}
      <div className="modal-backdrop fade show" onClick={onClose}></div>

      {/* Modal container */}
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            {/* Loader overlay during deletion */}
            {loading && <Loader overlay size="lg" />}

            {/* Header with trash icon and close button */}
            <div className="d-flex justify-content-between mb-3">
              <div className="delete-trash">
                <i className="fa-regular fa-trash-can"></i>
              </div>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            {/* Modal content */}
            <h5 className="modal-title mb-2">Delete Venue</h5>
            <p>Are you sure you want to delete this venue? This action cannot be undone.</p>

            {/* Action buttons */}
            <div className="d-flex flex-column flex-md-row gap-2 mt-3">
              <button className="btn btn-cancel flex-fill" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-danger flex-fill"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
