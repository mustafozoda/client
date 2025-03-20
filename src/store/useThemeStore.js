import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light", // Read from localStorage
  setTheme: (newTheme) => {
    set({ theme: newTheme });
    localStorage.setItem("theme", newTheme); // Store the new theme in localStorage
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark"); // Apply dark theme class immediately
    } else {
      document.documentElement.classList.remove("dark"); // Apply light theme class immediately
    }
  },
}));

// Apply theme to the document element on initial load
const theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

export default useThemeStore;
