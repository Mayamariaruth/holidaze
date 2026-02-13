import { apiFetch } from '../utils/api';
import type { UserProfile, UpdateProfilePayload } from '../types/user.types';
import { endpoints } from '../config/api';

export async function getProfile(name: string): Promise<UserProfile> {
  return apiFetch<UserProfile>(`${endpoints.profiles}/${name}?_bookings=true`);
}

export async function updateProfile(
  name: string,
  data: UpdateProfilePayload
): Promise<UserProfile> {
  return apiFetch<UserProfile>(`${endpoints.profiles}/${name}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
