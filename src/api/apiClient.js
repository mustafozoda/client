const API_BASE_URL = import.meta.env.VITE_BASE_API_URL.replace(/\/$/, "");

// const getToken = () => sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
export const getToken = () =>
  sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

export const apiClient = async (endpoint, options = {}) => {
  const token = getToken();

  if (token) {
    console.log("Using token:", token);
  } else {
    console.warn(" No token found in storage.");
  }

  const headers = {
    ...(options.headers || {}),
    "Content-Type": options.headers?.["Content-Type"] || "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };


  // console.log("API Request Details:");
  // console.log("URL:", `${API_BASE_URL}/${endpoint.replace(/^\//, "")}`);
  // console.log("Headers:", headers);
  // console.log("Options:", options);

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint.replace(/^\//, "")}`, {
      ...options,
      headers,
    });

    // console.log(" API Response Status:", response.status);
    // console.log(" Response Headers:", response.headers);

    if (response.status === 401 || response.status === 403) {
      console.warn(`${response.status} Error! Logging out user.`);
      sessionStorage.removeItem("authToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("logout"));
      // window.location.reload();
      window.location.href = '/login';
      throw new Error("Unauthorized - Token expired or invalid");
      // return
    }



    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const errorMessage = contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();
      throw new Error(
        `API Error ${response.status}: ${typeof errorMessage === "string" ? errorMessage : errorMessage.message || JSON.stringify(errorMessage)
        }`
      );
    }

    if (contentType && contentType.includes("application/json") && response.status !== 204) {
      const data = await response.json();
      // console.log("API Response Body:", data);
      return data;
    }

    // return null;
    return response.text();
  } catch (error) {
    console.error("Network/API request failed:", error.message || error);
    throw error;
  }
};

