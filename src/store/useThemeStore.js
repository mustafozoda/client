import { create } from "zustand";

// Ensure theme is set on initial load
const getStoredTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme || "light";
};

const useThemeStore = create((set) => {
  const theme = getStoredTheme();

  // Apply the theme immediately to avoid flickering
  document.documentElement.classList.toggle("dark", theme === "dark");

  return {
    theme,
    setTheme: (newTheme) => {
      set({ theme: newTheme });
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    },
  };
});

export default useThemeStore;
