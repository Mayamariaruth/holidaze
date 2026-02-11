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

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('API error:', errorData);
    throw new Error(errorData?.errors?.[0]?.message || 'API request failed');
  }

  const json = await response.json();
  return json.data ?? json;
}
