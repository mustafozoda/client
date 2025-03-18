import { create } from "zustand";
import { login } from "../api/authApi";

const useAuthStore = create((set) => ({
  user: null,
  login: async (email, password) => {
    try {
      const res = await login({ email, password });
      set({ user: res.user });
    } catch (error) {
      console.error("Login failed:", error);
    }
  },
  logout: () => set({ user: null }),
}));

export default useAuthStore;
