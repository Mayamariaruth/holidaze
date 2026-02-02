import { endpoints } from '../config/api';
import { apiFetch } from '../utils/api';
import type { Venue } from '../types/venue.types';

export function getVenues() {
  return apiFetch<Venue[]>(endpoints.venues);
}
