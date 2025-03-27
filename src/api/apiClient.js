const API_BASE_URL = import.meta.env.VITE_BASE_API_URL.replace(/\/$/, "");

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    console.log("Using token:", token);
  } else {
    console.warn("No token found in localStorage.");
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint.replace(/^\//, "")}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("Unauthorized! Removing token and redirecting to login.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      throw new Error(`Error ${response.status}: ${await response.text()}`);
    }

    return response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
