import { create } from "zustand";
import { apiClient } from "../api/apiClient";

const useAuthStore = create((set) => ({
  user: (() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("❌ Error parsing user data:", error);
      return null;
    }
  })(),

  authToken: sessionStorage.getItem("authToken") || null,

  login: async (username, password) => {
    try {
      console.log("🔄 Attempting login...");

      const response = await apiClient("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("📩 Login response:", response);

      if (!response.token || !response.user) {
        throw new Error("Invalid login response. Missing token or user.");
      }

      sessionStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      set({ user: response.user, authToken: response.token });
      console.log("✅ Login successful:", response.user);
      return { success: true, user: response.user };
    } catch (error) {
      console.error("❌ Login error:", error.message);
      return { success: false, error: error.message };
    }
  },

  register: async ({ username, email, password }) => {
    try {
      console.log("🔄 Registering user:", { username, email });

      const response = await apiClient("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      console.log("📩 Registration response:", response);

      if (!response.token || !response.user) {
        console.error("🚨 Unexpected response structure:", response);
        throw new Error("Invalid registration response. Missing token or user.");
      }

      sessionStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      set({ user: response.user, authToken: response.token });
      console.log("✅ Registration successful:", response.user);
      return { success: true, user: response.user };
    } catch (error) {
      console.error("❌ Registration error:", error.message);
      return { success: false, error: error.message };
    }
  },

  logout: () => {
    console.log("🔄 Logging out...");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("user");
    set({ user: null, authToken: null });
    console.log("✅ User logged out.");
  },

  checkAuth: async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);

        // OPTIONAL: Validate token with backend
        const response = await apiClient("/verify-token", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          console.warn("⚠️ Token validation failed. Logging out...");
          useAuthStore.getState().logout();
          return false;
        }

        set({ user: parsedUser, authToken: token });
        console.log("✅ Authenticated user:", parsedUser);
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
