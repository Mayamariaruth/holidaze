import { apiFetch } from '../utils/api';
import type { UserProfile } from '../types/user.types';

export async function getProfile(userId: string): Promise<UserProfile> {
  return apiFetch<UserProfile>(`/profiles/${userId}?_bookings=true`);
}
