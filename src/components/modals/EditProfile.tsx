export default function EditProfile() {
  return (
    <>
      <div
        className="modal fade"
        id="edit-profile-modal"
        aria-labelledby="edit-profile-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h2 className="modal-title" id="edit-profile-modal-label">
                Edit Profile
              </h2>
              <button type="button" data-bs-dismiss="modal">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <hr />
            {/* Form */}
            <div className="modal-body">
              <form id="edit-profile-form" noValidate>
                {/* Account type */}
                <div className="mb-3">
                  <label htmlFor="profile-account" className="form-label">
                    Account type
                  </label>
                  <input type="radio" />
                  <input type="radio" />
                </div>

                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="profile-username" className="form-label">
                    Username
                  </label>
                  <input />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="profile-email" className="form-label">
                    Email
                  </label>
                  <input type="email" />
                </div>

                {/* Banner */}
                <div className="mb-3">
                  <label htmlFor="profile-banner" className="form-label">
                    Banner
                  </label>
                  <input />
                </div>

                {/* Avatar */}
                <div className="mb-3">
                  <label htmlFor="profile-avatar" className="form-label">
                    Avatar
                  </label>
                  <input />
                </div>

                <hr />
                {/* Buttons */}
                <div className="d-flex flex-column gap-2 mt-4">
                  <button type="submit">Confirm</button>
                  <button type="button" data-bs-dismiss="modal">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
