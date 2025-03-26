import { create } from "zustand";

const getStoredTheme = () => localStorage.getItem("theme") || "light";

const useThemeStore = create((set) => ({
  theme: getStoredTheme(),
  setTheme: (newTheme) => {
    set({ theme: newTheme });
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  },
}));

export default useThemeStore;
