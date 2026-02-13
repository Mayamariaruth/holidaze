import { apiFetch } from '../utils/api';
import type { UserProfile } from '../types/user.types';
import { endpoints } from '../config/api';

export async function getProfile(name: string): Promise<UserProfile> {
  return apiFetch<UserProfile>(`${endpoints.profiles}/${name}?_bookings=true`);
}
