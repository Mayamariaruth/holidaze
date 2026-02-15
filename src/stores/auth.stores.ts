import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, AuthUser } from '../types/auth.types';

interface AuthStore extends AuthState {
  /**
   * Stores the authenticated user and access token.
   */
  login: (user: AuthUser, token: string) => void;

  /**
   * Clears all authentication state.
   */
  logout: () => void;

  /**
   * Manually updates the current user role.
   */
  setRole: (role: 'customer' | 'venue_manager') => void;
}

/**
 * Global authentication store.
 *
 * Handles authentication state including the current user,
 * access token, role, and authentication status.
 *
 * State is persisted to localStorage.
 *
 * @example
 * const { user, login, logout } = useAuthStore();
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      role: null,
      isAuthenticated: false,

      login: (user, token) =>
        set({
          user,
          accessToken: token,
          role: user.venueManager ? 'venue_manager' : 'customer',
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          role: null,
          isAuthenticated: false,
        }),

      setRole: (role) => set({ role }),
    }),
    {
      name: 'holidaze-auth',
    }
  )
);
