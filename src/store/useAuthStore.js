import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

const useAuthStore = create((set) => ({
  user: JSON.parse(sessionStorage.getItem("user")) || null,

  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const { token, user } = await response.json();
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      set({ user });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  register: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Registration failed");

      console.log("User registered successfully!");
    } catch (error) {
      console.error("Registration error:", error);
    }
  },

  logout: () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useAuthStore;
