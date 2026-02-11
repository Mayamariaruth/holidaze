import { create } from 'zustand';
import type { UserProfile } from '../types/user.types';

interface AuthState {
  user: UserProfile | null;
  accessToken?: string;
  setUser: (user: UserProfile) => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: undefined,
  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
}));
