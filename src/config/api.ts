export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;

export const endpoints = {
  venues: `${API_BASE_URL}/holidaze/venues`,
  bookings: `${API_BASE_URL}/holidaze/bookings`,
  profiles: `${API_BASE_URL}/holidaze/profiles`,
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
};
