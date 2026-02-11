import { useAuthStore } from '../stores/auth.stores';

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().accessToken;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    console.error('API error:', json);
    const message = json?.message || response.statusText || 'API request failed';
    throw new Error(message);
  }

  return json?.data ?? json;
}
