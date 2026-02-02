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

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const json = await response.json();
  return json.data ?? json;
}
