export type UserRole = 'customer' | 'venue_manager';

export interface AuthUser {
  name: string;
  email: string;
  avatar?: string;
  venueManager: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
}
