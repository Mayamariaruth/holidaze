import { endpoints } from '../config/api';
import { apiFetch } from '../utils/api';
import type { Venue } from '../types/venue.types';

export function getVenues() {
  return apiFetch<Venue[]>(endpoints.venues);
}

export function fetchVenueById(id: string) {
  return apiFetch(`${endpoints.venues}/${id}?_bookings=true&_owner=true`);
}
