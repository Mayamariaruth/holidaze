import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth.stores';
import { getProfile } from '../../services/profiles.service';
import Dashboard from '../../components/layout/Dashboard';
import type { UserProfile } from '../../types/user.types';

export default function ManagerDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const { user } = useAuthStore();

  useEffect(() => {
    if (!user?.name) return;

    const { name } = user;

    async function fetchProfile() {
      try {
        const data = await getProfile(name);
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProfile();
  }, [user]);

  return (
    <Dashboard profile={profile}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="h2">Venues</p>
        <button className="btn btn-primary">Create Venue</button>
      </div>

      {/* Venue list */}
    </Dashboard>
  );
}
