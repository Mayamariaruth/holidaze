import { endpoints } from '../config/api';
import { apiFetch } from '../utils/api';
import type { AuthUser } from '../types/auth.types';

interface LoginResponse {
  accessToken: string;
  user: AuthUser;
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

export function loginUser(payload: LoginPayload) {
  return apiFetch<LoginResponse>(endpoints.login, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function registerUser(payload: RegisterPayload) {
  return apiFetch<AuthUser>(endpoints.register, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
