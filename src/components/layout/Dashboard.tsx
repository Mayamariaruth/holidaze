import { useState } from 'react';
import placeholder from '../../assets/images/placeholder.jpg';
import EditProfile from '../modals/EditProfile';
import type { UserProfile } from '../../types/user.types';

interface Props {
  profile: UserProfile | null;
  children: React.ReactNode;
}

export default function Dashboard({ profile, children }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dashboard-page">
      {/* Hero / Banner */}
      <div
        className="dashboard-banner py-5 mb-5 rounded-4"
        style={{
          backgroundImage: `url(${profile?.banner?.url || placeholder})`,
        }}
      >
        {profile && (
          <div className="profile-card bg-white p-3 p-md-5 rounded-4 position-relative">
            <div className="d-flex flex-column align-items-center gap-4 position-relative">
              <div className="position-relative w-100">
                <img
                  src={profile.avatar?.url || placeholder}
                  alt={profile.avatar?.alt || profile.name}
                  className="profile-avatar rounded-4"
                />
                {/* Edit icon */}
                <button
                  className="btn position-absolute top-0 end-0"
                  onClick={() => setShowModal(true)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>

              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <p className="fw-medium profile-label">Name</p>
                  <p>{profile.name}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="fw-medium profile-label">Email</p>
                  <p>{profile.email}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="fw-medium profile-label">Account type</p>
                  <p>{profile.venueManager ? 'Venue Manager' : 'Customer'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Box */}
      <div className="dashboard-content bg-white rounded-4 p-3 p-md-5 mb-5">{children}</div>

      {/* Edit Profile Modal */}
      {showModal && <EditProfile onClose={() => setShowModal(false)} />}
    </div>
  );
}
