import { useState } from 'react';
import placeholder from '../../assets/images/placeholder.jpg';
import EditProfile from '../modals/EditProfile';
import type { UserProfile } from '../../types/user.types';
import Alert from '../ui/Alert';

interface Props {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  globalAlert?: { type: 'success' | 'danger'; message: string } | null;
  setGlobalAlert?: React.Dispatch<
    React.SetStateAction<{ type: 'success' | 'danger'; message: string } | null>
  >;
  children: React.ReactNode;
}

/**
 * Dashboard page layout for logged-in users.
 *
 * Displays user profile, banner, global alerts, and a content section.
 * Includes modal for editing profile.
 *
 * @param {Props} props Component props
 * @returns {JSX.Element} Dashboard layout
 *
 * @example
 * <DashboardLayout profile={profile} setProfile={setProfile}>
 *   <MyContent />
 * </DashboardLayout>
 */
export default function DashboardLayout({
  profile,
  setProfile,
  globalAlert,
  setGlobalAlert,
  children,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dashboard-page">
      {/* Global alerts */}
      {globalAlert && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <Alert
            type={globalAlert.type}
            message={globalAlert.message}
            onClose={() => setGlobalAlert?.(null)}
            autoDismiss={5000}
          />
        </div>
      )}

      {/* Banner */}
      <div
        className="dashboard-banner py-5 mb-5 rounded-4"
        style={{ backgroundImage: `url(${profile.banner?.url || placeholder})` }}
      >
        <div className="profile-card bg-white p-3 ps-md-5 pe-md-5 pt-md-5 rounded-4">
          <div className="d-flex flex-column align-items-center gap-4">
            <div className="position-relative w-100">
              <img
                src={profile.avatar?.url || placeholder}
                alt={profile.avatar?.alt || profile.name}
                className="profile-avatar rounded-4"
              />
              <button
                className="btn position-absolute top-0 end-0"
                onClick={() => setShowModal(true)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
            <p className="mb-0">{profile.bio}</p>

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
      </div>

      {/* Content */}
      <div className="dashboard-content bg-white rounded-4 p-3 p-md-5 mb-5">{children}</div>

      {/* Edit profile modal */}
      {showModal && (
        <EditProfile
          profile={profile}
          setProfile={setProfile}
          onClose={() => setShowModal(false)}
          setGlobalAlert={setGlobalAlert}
        />
      )}
    </div>
  );
}
