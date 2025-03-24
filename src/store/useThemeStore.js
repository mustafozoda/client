import { create } from "zustand";

// Retrieve stored theme or default to "light"
const getStoredTheme = () => localStorage.getItem("theme") || "light";

const useThemeStore = create((set) => ({
  theme: getStoredTheme(),
  setTheme: (newTheme) => {
    set({ theme: newTheme });
    localStorage.setItem("theme", newTheme);

    // Apply the theme globally
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  },
}));

export default useThemeStore;
