const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs: number = 5000
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Request failed with status ${response.status} (${response.statusText})`);
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
