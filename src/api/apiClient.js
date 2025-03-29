const API_BASE_URL = "http://localhost:8080";

const getToken = () => sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

export const apiClient = async (endpoint, options = {}) => {
  const token = getToken();

  if (token) {
    console.log("🔑 Using token:", token);
  } else {
    console.warn("⚠️ No token found in storage.");
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

    if (response.status === 401) {
      console.warn("🚫 Unauthorized! Logging out user.");
      sessionStorage.removeItem("authToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return;
    }

    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      const errorMessage = contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();
      throw new Error(`❌ API Error ${response.status}: ${JSON.stringify(errorMessage)}`);
    }

    return contentType && contentType.includes("application/json")
      ? response.json()
      : response.text();
  } catch (error) {
    console.error("❌ Network/API request failed:", error.message || error);
    throw error;
  }
};