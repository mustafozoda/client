const API = import.meta.env.VITE_BASE_API_URL;

export const apiClient = async (endpoint, options = {}) => {
  const res = await fetch(`${API}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};
