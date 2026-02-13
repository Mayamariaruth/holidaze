import { useState } from 'react';
import { deleteVenue } from '../../services/venues.service';

interface Props {
  venueId: string;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function DeleteVenue({ venueId, onClose, onDelete }: Props) {
  const [loading, setLoading] = useState(false);

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
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="d-flex justify-content-between mb-3">
              <div className="delete-trash">
                <i className="fa-regular fa-trash-can"></i>
              </div>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <h5 className="modal-title mb-2">Delete Venue</h5>
            <p>Are you sure you want to delete this venue? This action cannot be undone.</p>
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
