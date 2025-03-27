import { create } from "zustand";
import { apiClient } from "../api/apiClient";

const useAuthStore = create((set) => ({
  user: (() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  })(),

  authToken: localStorage.getItem("authToken") || null,

  login: async (email, password) => {
    try {
      console.log("Attempting login for email:", email);
      const response = await apiClient("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response || !response.token || !response.user) {
        throw new Error("Invalid login response. Missing token or user.");
      }

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      set((state) => ({ ...state, user: response.user, authToken: response.token }));
      console.log("✅ Login successful:", response.user);
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
        body: JSON.stringify({ username, email, password }),
      });

      if (!response || !response.ok) {
        throw new Error(`Registration failed: ${response.message || "Unknown error"}`);
      }

      console.log("✅ Registration successful:", response);
      return response;
    } catch (error) {
      console.error("❌", error.message);
      return null;
    }
  },

  logout: () => {
    console.log("Logging out user...");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    set({ user: null, authToken: null });
  },

  checkAuth: () => {
    try {
      const token = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        set((state) => ({ ...state, user: parsedUser, authToken: token }));
        console.log("✅ Authenticated user:", parsedUser);
        return true;
      }

      console.warn("⚠️ No valid session found.");
      return false;
    } catch (error) {
      console.error("❌ Error restoring user session:", error);
      return false;
    }
  },
}));

export default useAuthStore;
