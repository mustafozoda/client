import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,

  login: async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const token = await response.text();
      localStorage.setItem("token", token);
      set({ user: { email } });
    } catch (error) {
      console.error("Login failed:", error);
    }
  },

  register: async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      console.log("User registered successfully!");
    } catch (error) {
      console.error("Registration error:", error);
    }
  },
}));

export default useAuthStore;
