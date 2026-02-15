import { useState } from 'react';
import { useAuthStore } from '../stores/auth.stores';
import { loginUser, registerUser } from '../services/auth.service';
import type { AuthUser } from '../types/auth.types';

/**
 * Custom hook for authentication actions and state.
 *
 * Handles login, registration, and logout by coordinating
 * API calls with the auth store while exposing loading and error state.
 *
 * @returns {{
 *   login: (email: string, password: string) => Promise<void>,
 *   register: (name: string, email: string, password: string, venueManager: boolean) => Promise<void>,
 *   logout: () => void,
 *   isLoading: boolean,
 *   isError: boolean
 * }} Authentication helpers and status flags.
 *
 * @example
 * const { login, register, logout, isLoading, isError } = useAuth();
 */
export function useAuth() {
  const loginToStore = useAuthStore((s) => s.login);
  const logoutFromStore = useAuthStore((s) => s.logout);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  /**
   * Log in a user using email and password.
   *
   * On success, stores the authenticated user and access token
   * in the auth store.
   */
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const data = await loginUser({ email, password });

      const { name, email: userEmail, venueManager, accessToken } = data;
      const user: AuthUser = { name, email: userEmail, venueManager };

      loginToStore(user, accessToken);

      // Immediately update role to reflect the correct content in the dashboard
      useAuthStore.getState().setRole(venueManager ? 'venue_manager' : 'customer');
    } catch (error) {
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register a new user.
   *
   * Does not automatically log the user in.
   */
  const register = async (name: string, email: string, password: string, venueManager: boolean) => {
    try {
      setIsLoading(true);
      setIsError(false);

      await registerUser({ name, email, password, venueManager });
    } catch (error) {
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    logout: logoutFromStore,
    isLoading,
    isError,
  };
}
