const API = import.meta.env.VITE_BASE_API_URL;

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem("authToken");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    console.error(`API error: ${res.status}`);
    throw new Error(`Failed to fetch data from ${endpoint}: ${res.status}`);
  }

  return res.json();
};
