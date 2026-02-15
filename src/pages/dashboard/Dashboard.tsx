import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth.stores';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { getProfile } from '../../services/profiles.service';
import Loader from '../../components/ui/Loader';
import ManagerDashboard from './ManagerDashboard';
import CustomerDashboard from './CustomerDashboard';
import type { UserProfile } from '../../types/user.types';

/**
 * DashboardWrapper
 *
 * Fetches the current user's profile and renders the appropriate dashboard
 * based on their account type (venue manager or customer).
 *
 * Displays a loader while the profile is being fetched.
 *
 * @component
 * @returns {JSX.Element} The dashboard layout with either ManagerDashboard or CustomerDashboard inside.
 *
 * @remarks
 * - Updates the global auth store with the user's role after fetching the profile.
 * - Handles API errors gracefully and shows a fallback error message.
 *
 * @example
 * <DashboardWrapper />
 */
export default function DashboardWrapper() {
  const { user, setRole } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [globalAlert, setGlobalAlert] = useState<{
    type: 'success' | 'danger';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!user?.name) return;
    const { name } = user;

    async function fetchProfile() {
      setLoading(true);
      try {
        const data = await getProfile(name);
        const normalizedProfile: UserProfile = {
          ...data,
          venueManager: data.venueManager ?? false,
        };
        setProfile(normalizedProfile);

        // Set role in auth store
        const role = normalizedProfile.venueManager ? 'venue_manager' : 'customer';
        setRole(role);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user, setRole]);

  if (loading) return <Loader overlay size="lg" />;
  if (!profile) return <p>Error loading profile</p>;

  return (
    <DashboardLayout
      profile={profile}
      setProfile={setProfile}
      globalAlert={globalAlert}
      setGlobalAlert={setGlobalAlert}
    >
      {profile.venueManager ? (
        <ManagerDashboard
          profile={profile}
          setProfile={setProfile}
          setGlobalAlert={setGlobalAlert}
        />
      ) : (
        <CustomerDashboard
          profile={profile}
          setProfile={setProfile}
          setGlobalAlert={setGlobalAlert}
        />
      )}
    </DashboardLayout>
  );
}
