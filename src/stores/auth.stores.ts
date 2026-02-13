import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, AuthUser } from '../types/auth.types';

interface AuthStore extends AuthState {
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  setRole: (role: 'customer' | 'venue_manager') => void; // new
}

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
          role: user?.venueManager ? 'venue_manager' : 'customer',
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
