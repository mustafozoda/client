import { useEffect } from "react";
import useThemeStore from "./store/useThemeStore"; // ✅ Import Zustand store
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";

const App = () => {
  const { theme, setTheme } = useThemeStore(); // ✅ Zustand theme state

  useEffect(() => {
    // ✅ Apply dark mode class dynamically
    document.documentElement.classList.toggle("dark", theme === "dark");

    // ✅ Sync theme with localStorage changes (for multiple tabs)
    const syncTheme = () => setTheme(localStorage.getItem("theme") || "light");
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("storage", syncTheme);
    };
  }, [theme, setTheme]);

  useEffect(() => {
    // ✅ Prevent Zooming
    const preventZoomKeys = (event) => {
      if (event.ctrlKey && ["=", "-", "0", "+"].includes(event.key)) {
        event.preventDefault();
      }
    };
    const preventScrollZoom = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", preventZoomKeys);
    document.addEventListener("wheel", preventScrollZoom, { passive: false });

    return () => {
      document.removeEventListener("keydown", preventZoomKeys);
      document.removeEventListener("wheel", preventScrollZoom);
    };
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#a1abae] font-mono font-bold transition-colors duration-300 ease-in-out dark:bg-[#212121] dark:text-gray-300">
      <Navbar />
      <main className="flex flex-1">
        <Sidebar />
        <AppRoutes />
      </main>
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 border border-[#2B2B2B]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#171717] via-[#000000] to-[#212121] opacity-20" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
    </div>
  );
};

export default App;
