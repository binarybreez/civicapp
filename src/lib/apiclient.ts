// apiClient.ts
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiClientOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  token?: string; // access_token if user is logged in
  params?: Record<string, string | number>;
}

interface ApiResponse<T> {
  data: T | null;
  error: { status: number; message: string } | null;
}

const API_BASE_URL = "https://703199f3dab6.ngrok-free.app"; // replace later

/**
 * Ensure phone numbers are always in E.164 format (+91XXXXXXXXXX for India).
 */
const formatPhone = (phone: string): string => {
  if (!phone.startsWith("+91")) {
    return `+91${phone}`;
  }
  return phone;
};

const apiClient = async <T = any>(
  endpoint: string,
  { method = "GET", body, headers = {}, token, params }: ApiClientOptions = {}
): Promise<ApiResponse<T>> => {
  try {
    // Build query string from params
    let url = `${API_BASE_URL}${endpoint}`;
    if (params) {
      const queryString = new URLSearchParams(
        Object.entries(params).reduce(
          (acc, [key, value]) => {
            acc[key] = value.toString();
            return acc;
          },
          {} as Record<string, string>
        )
      ).toString();
      url += `?${queryString}`;
    }

    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    // Attach auth token if available
    if (token) {
      (fetchOptions.headers as Record<string, string>)["Authorization"] =
        `Bearer ${token}`;
    }

    // Stringify body if present
    if (body) {
      // Special case: normalize phone before sending
      if ((body as any).phone) {
        (body as any).phone = formatPhone((body as any).phone);
      }
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);

    const responseBody = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        data: null,
        error: {
          status: response.status,
          message:
            responseBody?.detail ||
            responseBody?.error ||
            response.statusText ||
            "Unknown error",
        },
      };
    }

    return { data: responseBody as T, error: null };
  } catch (err: any) {
    console.error("API call failed:", err);
    return {
      data: null,
      error: {
        status: 0,
        message: err?.message || "Network request failed",
      },
    };
  }
};

export default apiClient;
