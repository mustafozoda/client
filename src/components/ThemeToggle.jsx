import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
const ThemeToggle = ({ setDark }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
    setDark(theme === "dark");
  }, [theme, setDark]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 flex items-center justify-center"
    >
      {theme === "dark" ? <Sun color="gold" /> : <Moon color="black" />}
    </button>
  );
};

export default ThemeToggle;
