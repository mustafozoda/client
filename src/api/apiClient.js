const API = import.meta.env.VITE_BASE_API_URL;

export const apiClient = async (endpoint, options = {}) => {
  const token = sessionStorage.getItem("authToken");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    const errorMessage = await res.text();
    console.error(`API error: ${res.status} - ${errorMessage}`);
    if (res.status === 401) {
      sessionStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    throw new Error(`Error ${res.status}: ${errorMessage}`);
  }

  return res.json();
};
