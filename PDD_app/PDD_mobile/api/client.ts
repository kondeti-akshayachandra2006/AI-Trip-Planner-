import { env } from '@/utils/env';

export async function apiClient<T>(path: string, fallback: T, init?: RequestInit, timeoutMs = 10000): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${env.apiBaseUrl}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    });
    clearTimeout(id);
    if (!response.ok) {
      // surface 401/403 separately for auth handling
      if (response.status === 401 || response.status === 403) {
        console.warn(`API auth error ${response.status} for ${path}`);
      } else {
        console.warn(`API failed ${response.status} for ${path}`);
      }
      return fallback;
    }
    return (await response.json()) as T;
  } catch (err: any) {
    clearTimeout(id);
    if (err?.name === 'AbortError') {
      console.warn(`API request timed out after ${timeoutMs}ms: ${path}`);
    } else {
      console.error('API request error', err);
    }
    return fallback;
  }
}
