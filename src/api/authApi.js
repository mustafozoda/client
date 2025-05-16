import { apiClient } from "./apiClient";

export const login = async (credentials, persist = false) => {
  try {
    const response = await apiClient("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.token) {
      throw new Error("Invalid login response. Token missing.");
    }

    (persist ? localStorage : sessionStorage).setItem("authToken", data.token);

    return { success: true, token: data.token };
  } catch (error) {
    console.error("Login error:", error.message);
    return { success: false, error: error.message };
  }
};
