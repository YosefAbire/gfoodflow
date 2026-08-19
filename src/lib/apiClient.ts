const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

const ACCESS_TOKEN_KEY = 'gff_access_token';
const REFRESH_TOKEN_KEY = 'gff_refresh_token';

let inMemoryAccessToken: string | null = null;
let inMemoryRefreshToken: string | null = null;

export function getAccessToken(): string | null {
  if (inMemoryAccessToken) return inMemoryAccessToken;
  if (typeof window !== 'undefined') {
    inMemoryAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return inMemoryAccessToken;
}

export function getRefreshToken(): string | null {
  if (inMemoryRefreshToken) return inMemoryRefreshToken;
  if (typeof window !== 'undefined') {
    inMemoryRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return inMemoryRefreshToken;
}

export function setTokens(accessToken: string, refreshToken: string): void {
  inMemoryAccessToken = accessToken;
  inMemoryRefreshToken = refreshToken;
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearTokens(): void {
  inMemoryAccessToken = null;
  inMemoryRefreshToken = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}

async function attemptTokenRefresh(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearTokens();
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      clearTokens();
      return null;
    }

    const data = await res.json();
    if (data.access_token && data.refresh_token) {
      setTokens(data.access_token, data.refresh_token);
      return data.access_token;
    }

    clearTokens();
    return null;
  } catch {
    clearTokens();
    return null;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs: number = 5000,
  isRetry: boolean = false
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const token = getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 401 && !isRetry && !endpoint.includes('/auth/login')) {
      const newToken = await attemptTokenRefresh();
      if (newToken) {
        return apiFetch<T>(endpoint, options, timeoutMs, true);
      }
    }

    if (!response.ok) {
      let errorMessage = `API Request failed with status ${response.status} (${response.statusText})`;
      try {
        const errorData = await response.json();
        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
        } else if (errorData?.detail) {
          errorMessage = typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail);
        }
      } catch {
        // use default error message if body parsing fails
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function fetchWithFallback<T>(
  endpoint: string,
  fallbackData: T,
  options: RequestInit = {},
  timeoutMs: number = 4000
): Promise<T> {
  try {
    const data = await apiFetch<T>(endpoint, options, timeoutMs);
    return data;
  } catch (error) {
    console.warn(`[GamoFoodFlow API] Backend endpoint '${endpoint}' unavailable. Using local fallback data.`, error);
    return fallbackData;
  }
}
