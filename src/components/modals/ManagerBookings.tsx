export default function ManagerBookings() {
  return (
    <>
      <div
        className="modal fade"
        id="manager-bookings-modal"
        aria-labelledby="manager-bookings-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h2 className="modal-title" id="manager-bookings-modal-label">
                Bookings
              </h2>
              <button type="button" data-bs-dismiss="modal">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <hr />
            <div className="manager-bookings-container"></div>
          </div>
        </div>
      </div>
      <div />
    </>
  );
}
