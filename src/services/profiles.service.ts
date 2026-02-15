import { apiFetch } from '../utils/api';
import type { UserProfile, UpdateProfilePayload } from '../types/user.types';
import { endpoints } from '../config/api';

/**
 * Fetches a user profile by name.
 *
 * @param {string} name Profile name.
 * @returns {Promise<UserProfile>} User profile with bookings and venues.
 */
export function getProfile(name: string): Promise<UserProfile> {
  return apiFetch<UserProfile>(`${endpoints.profiles}/${name}?_bookings=true&_venues=true`);
}

/**
 * Updates a user profile.
 *
 * @param {string} name Profile name.
 * @param {UpdateProfilePayload} data Updated profile fields.
 * @returns {Promise<UserProfile>} Updated user profile.
 */
export function updateProfile(name: string, data: UpdateProfilePayload): Promise<UserProfile> {
  return apiFetch<UserProfile>(`${endpoints.profiles}/${name}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
