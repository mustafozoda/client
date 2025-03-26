import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import useThemeStore from "../store/useThemeStore";

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center p-2"
    >
      {theme === "dark" ? <Sun color="gold" /> : <Moon color="black" />}
    </button>
  );
};

export default ThemeToggle;
