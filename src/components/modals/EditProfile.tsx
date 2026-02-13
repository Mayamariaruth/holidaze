interface Props {
  onClose: () => void;
}

export default function EditProfile({ onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" onClick={onClose}></div>

      <div className="modal show d-block" tabIndex={-1} aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h3 className="modal-title">Edit Profile</h3>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <form id="edit-profile-form" noValidate>
                {/* Account type */}
                <div className="mb-3">
                  <label className="form-label">Account type</label>
                  <div className="d-flex gap-4">
                    <div className="d-flex flex-column align-items-start gap-1">
                      <label htmlFor="customer">Customer</label>
                      <input type="radio" id="customer" name="accountType" />
                    </div>
                    <div className="d-flex flex-column align-items-start gap-1">
                      <label htmlFor="manager">Manager</label>
                      <input type="radio" id="manager" name="accountType" />
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="profile-name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="profile-name"
                    className="form-control"
                    placeholder="name123"
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="profile-email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="profile-email"
                    className="form-control"
                    placeholder="name@stud.noroff.no"
                  />
                </div>

                {/* Banner */}
                <div className="mb-3">
                  <label htmlFor="profile-banner" className="form-label">
                    Banner URL
                  </label>
                  <input
                    type="text"
                    id="profile-banner"
                    className="form-control"
                    placeholder="https://url.com/placeholder"
                  />
                </div>

                {/* Avatar */}
                <div className="mb-3">
                  <label htmlFor="profile-avatar" className="form-label">
                    Avatar URL
                  </label>
                  <input
                    type="text"
                    id="profile-avatar"
                    className="form-control"
                    placeholder="https://url.com/placeholder"
                  />
                </div>

                <hr />

                {/* Buttons */}
                <div className="d-flex flex-row gap-2 mt-4">
                  <button type="button" className="btn btn-cancel flex-fill" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex-fill">
                    Confirm
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
