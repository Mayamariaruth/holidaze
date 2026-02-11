import { useState } from 'react';
import { useAuthStore } from '../stores/auth.stores';
import { loginUser, registerUser } from '../services/auth.service';

export function useAuth() {
  const loginToStore = useAuthStore((s) => s.login);
  const logoutFromStore = useAuthStore((s) => s.logout);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const { user, accessToken } = await loginUser({ email, password });
      loginToStore(user, accessToken);
    } catch (error) {
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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
