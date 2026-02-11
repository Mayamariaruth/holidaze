export default function DeleteVenue() {
  return (
    <>
      <div
        className="modal fade"
        id="delete-venue-modal"
        aria-labelledby="delete-venue-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <div className="delete-trash">
                <i className="fa-regular fa-trash-can"></i>
              </div>
              <button type="button" data-bs-dismiss="modal">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <h2 className="modal-title" id="delete-venue-modal-label">
              Delete
            </h2>
            <p>Are you sure you want to delete this venue? This action cannot be undone.</p>
            {/* Buttons */}
            <div className="d-flex flex-column gap-2 mt-4">
              <button>Delete</button>
              <button type="button" data-bs-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
