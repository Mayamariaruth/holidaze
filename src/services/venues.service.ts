import { endpoints } from '../config/api';
import { apiFetch } from '../utils/api';
import type { Venue, VenuePayload } from '../types/venue.types';

/**
 * Fetches all venues including bookings.
 *
 * @returns {Promise<Venue[]>} Array of venues.
 */
export function getVenues() {
  return apiFetch<Venue[]>(`${endpoints.venues}?_bookings=true`);
}

/**
 * Fetches a single venue by ID.
 *
 * @param {string} id Venue ID.
 * @returns {Promise<Venue>} Venue details.
 */
export function fetchVenueById(id: string): Promise<Venue> {
  return apiFetch<Venue>(`${endpoints.venues}/${id}?_bookings=true&_owner=true`);
}

/**
 * Creates a new venue.
 *
 * @param {string} ownerName Owner username.
 * @param {VenuePayload} payload Venue data.
 * @returns {Promise<Venue>} Created venue.
 */
export function createVenue(ownerName: string, payload: VenuePayload) {
  return apiFetch<Venue>(`${endpoints.venues}`, {
    method: 'POST',
    body: JSON.stringify({ ...payload, owner: { name: ownerName } }),
  });
}

/**
 * Updates an existing venue.
 *
 * @param {string} id Venue ID.
 * @param {VenuePayload} payload Updated venue data.
 * @returns {Promise<Venue>} Updated venue.
 */
export function updateVenue(id: string, payload: VenuePayload) {
  return apiFetch<Venue>(`${endpoints.venues}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

/**
 * Deletes a venue by ID.
 *
 * @param {string} id Venue ID.
 * @returns {Promise<void>}
 */
export function deleteVenue(id: string) {
  return apiFetch<void>(`${endpoints.venues}/${id}`, {
    method: 'DELETE',
  });
}
