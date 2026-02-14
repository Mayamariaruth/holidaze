import { useAuthStore } from '../stores/auth.stores';

const API_KEY = import.meta.env.VITE_API_KEY;

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

  // Handle errors
  if (!response.ok) {
    const errorData = await response
      .text()
      .then((t) => (t ? JSON.parse(t) : null))
      .catch(() => null);
    console.error('API error:', errorData);
    throw new Error(errorData?.errors?.[0]?.message || 'API request failed');
  }

  // Handle empty responses
  const text = await response.text();
  if (!text) return {} as T;

  const json = JSON.parse(text);
  return json.data ?? json;
}
