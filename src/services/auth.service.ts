import { endpoints } from '../config/api';
import { apiFetch } from '../utils/api';
import type { AuthUser } from '../types/auth.types';

interface LoginResponse {
  name: string;
  email: string;
  venueManager: boolean;
  accessToken: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  venueManager?: boolean;
}

interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Logs in a user with email and password.
 *
 * @param {LoginPayload} payload User login credentials.
 * @returns {Promise<LoginResponse>} Authenticated user data and access token.
 *
 * @example
 * const response = await loginUser({ email, password });
 */
export function loginUser(payload: LoginPayload) {
  return apiFetch<LoginResponse>(endpoints.login, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Registers a new user.
 *
 * @param {RegisterPayload} payload User registration data.
 * @returns {Promise<AuthUser>} Newly created user.
 *
 * @example
 * await registerUser({ name, email, password });
 */
export function registerUser(payload: RegisterPayload) {
  return apiFetch<AuthUser>(endpoints.register, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
