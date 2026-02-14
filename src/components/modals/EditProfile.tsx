import { useState, useEffect } from 'react';
import type { UserProfile } from '../../types/user.types';
import { useAuthStore } from '../../stores/auth.stores';
import { getProfile, updateProfile } from '../../services/profiles.service';

interface Props {
  profile: UserProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  onClose: () => void;

  setGlobalAlert?: React.Dispatch<
    React.SetStateAction<{ type: 'success' | 'danger'; message: string } | null>
  >;
}

export default function EditProfile({ profile, setProfile, onClose, setGlobalAlert }: Props) {
  const { setRole } = useAuthStore();

  const [formState, setFormState] = useState({
    bio: '',
    accountType: 'customer' as 'customer' | 'manager',
    banner: '',
    avatar: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profile) return;

    setFormState({
      bio: profile.bio || '',
      accountType: profile.venueManager ? 'manager' : 'customer',
      banner: profile.banner?.url || '',
      avatar: profile.avatar?.url || '',
    });
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      accountType: e.target.value as 'customer' | 'manager',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);

    try {
      await updateProfile(profile.name, {
        bio: formState.bio,
        venueManager: formState.accountType === 'manager',
        banner: formState.banner ? { url: formState.banner } : undefined,
        avatar: formState.avatar ? { url: formState.avatar } : undefined,
      });

      const freshProfile = await getProfile(profile.name);
      setProfile(freshProfile);

      setRole(formState.accountType === 'manager' ? 'venue_manager' : 'customer');

      onClose();

      setGlobalAlert?.({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Failed to update profile:', error);
      setGlobalAlert?.({ type: 'danger', message: 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return null;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>

      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h3 className="modal-title">Edit Profile</h3>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Account type */}
                <div className="mb-3">
                  <label className="form-label">Account type</label>
                  <div className="d-flex gap-4">
                    <div className="d-flex flex-column gap-1 align-items-start">
                      <label>Customer</label>
                      <input
                        type="radio"
                        name="accountType"
                        value="customer"
                        checked={formState.accountType === 'customer'}
                        onChange={handleAccountTypeChange}
                      />
                    </div>
                    <div className="d-flex flex-column gap-1 align-items-start">
                      <label>Manager</label>
                      <input
                        type="radio"
                        name="accountType"
                        value="manager"
                        checked={formState.accountType === 'manager'}
                        onChange={handleAccountTypeChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-4">
                  <label className="form-label mb-0">Bio</label>
                  <textarea
                    name="bio"
                    className="form-control"
                    value={formState.bio}
                    onChange={handleChange}
                  />
                </div>

                {/* Banner */}
                <div className="mb-4">
                  <label className="form-label mb-0">Banner URL</label>
                  <input
                    type="text"
                    name="banner"
                    className="form-control"
                    value={formState.banner}
                    onChange={handleChange}
                  />
                </div>

                {/* Avatar */}
                <div className="mb-4">
                  <label className="form-label mb-0">Avatar URL</label>
                  <input
                    type="text"
                    name="avatar"
                    className="form-control"
                    value={formState.avatar}
                    onChange={handleChange}
                  />
                </div>

                <hr />

                <div className="d-flex gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-cancel flex-fill"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-primary flex-fill" disabled={loading}>
                    {loading ? 'Updating...' : 'Confirm'}
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
