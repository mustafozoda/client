const API = import.meta.env.VITE_BASE_API_URL;

export const apiClient = async (endpoint, options = {}) => {
  const res = await fetch(`${API}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    console.error(`API error: ${res.status}`);
    throw new Error(`Failed to fetch data from ${endpoint}: ${res.status}`);
  }

  return res.json();
};
