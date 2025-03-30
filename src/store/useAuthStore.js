import { create } from "zustand";
const API_URL = import.meta.env.VITE_BASE_API_URL.replace(/\/$/, "");

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

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      sessionStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      set({ user: data.user, authToken: data.token });
      console.log("✅ Login successful:", data.user);
      return { success: true, user: data.user };
    } catch (error) {
      console.error("❌ Login error:", error.message);
      return { success: false, error: error.message };
    }
  },

  register: async ({ username, email, password }) => {
    try {
      console.log("🔄 Registering user:", { username, email });

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      console.log("✅ Registration successful");
      return { success: true };
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
}));

export default useAuthStore;
