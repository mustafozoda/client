import { create } from "zustand";
import { apiClient } from "../api/apiClient";

const useAuthStore = create((set) => ({
  authToken: localStorage.getItem("authToken") || null,

  login: async (username, password) => {
    try {
      console.log("Attempting login for username:", username);
      const response = await apiClient("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response || !response.token) {
        throw new Error("Invalid login response. Missing token.");
      }

      localStorage.setItem("authToken", response.token);

      set({ authToken: response.token });
      console.log("✅ Login successful with token:", response.token);
    } catch (error) {
      console.error("❌ Login error:", error.message);
      throw error;
    }
  },

  register: async ({ username, email, password }) => {
    try {
      console.log("Registering user:", { username, email });

      const response = await apiClient("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      console.log("Registration response:", response);

      if (response.message !== "User registered successfully") {
        throw new Error(`Registration failed: ${response.message || "Unknown error"}`);
      }

      localStorage.setItem("authToken", response.token);

      console.log("✅ Registration successful with token:", response.token);
      return response;
    } catch (error) {
      console.error("❌ Registration error:", error.message);
      throw error;
    }
  },

  logout: () => {
    console.log("Logging out user...");
    localStorage.removeItem("authToken");
    set({ authToken: null });
  },

  checkAuth: () => {
    try {
      const token = localStorage.getItem("authToken");

      if (token) {
        set({ authToken: token });
        console.log("✅ Authenticated with token:", token);
        return true;
      }

      console.warn("⚠️ No valid session found.");
      return false;
    } catch (error) {
      console.error("❌ Error restoring session:", error);
      return false;
    }
  },
}));

export default useAuthStore;
