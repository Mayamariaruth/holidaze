import { useAuthStore } from '../stores/auth.stores';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Fetch data from an API with optional authentication.
 *
 * @param {string} url The URL for the API request.
 * @param {RequestInit} [options={}] Additional fetch options (method, body, etc.).
 * @param {string} [token] Optional authentication token.
 * @returns {Promise<T>} A promise resolving to the API response data.
 *
 * @example
 * const data = await apiFetch<MyData>('/api/endpoint');
 */
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const authToken = token ?? useAuthStore.getState().accessToken;

  const headers = new Headers(options.headers || {});

  headers.set('Content-Type', 'application/json');
  headers.set('X-Noroff-API-Key', API_KEY);

  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle API errors
  if (!response.ok) {
    const errorData = await response
      .text()
      .then((t) => (t ? JSON.parse(t) : null))
      .catch(() => null);
    console.error('API error:', errorData);
    throw new Error(errorData?.errors?.[0]?.message || 'API request failed');
  }

  // Return empty object for no content response
  const text = await response.text();
  if (!text) return {} as T;

  // Parse and return JSON response
  const json = JSON.parse(text);
  return json.data ?? json;
}
