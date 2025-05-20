import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useThemeStore from "./store/useThemeStore";
import useAuthStore from "./store/useAuthStore";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import CopyAlertProvider from "./components/logic/CopyAlertProvider";
import GlobalModal from "./components/GlobalModal";
import Login from "./auth/Login";
import Register from "./auth/Register";

const App = () => {
  const { theme, setTheme } = useThemeStore();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    const syncTheme = () => setTheme(localStorage.getItem("theme") || "light");
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("storage", syncTheme);
    };
  }, [theme, setTheme]);

  // useEffect(() => {
  //   const preventZoomKeys = (event) => {
  //     if (event.ctrlKey && ["=", "-", "0", "+"].includes(event.key)) {
  //       event.preventDefault();
  //     }
  //   };
  //   const preventScrollZoom = (event) => {
  //     if (event.ctrlKey) {
  //       event.preventDefault();
  //     }
  //   };

  //   document.addEventListener("keydown", preventZoomKeys);
  //   document.addEventListener("wheel", preventScrollZoom, { passive: false });

  //   return () => {
  //     document.removeEventListener("keydown", preventZoomKeys);
  //     document.removeEventListener("wheel", preventScrollZoom);
  //   };
  // }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#a1abae] font-mono font-bold transition-colors duration-300 ease-in-out dark:bg-[#212121] dark:text-gray-300">
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <Navbar />
          <main className="flex flex-1">
            <Sidebar />
            <Routes>
              <Route path="*" element={<AppRoutes />} />
            </Routes>
          </main>
          <CopyAlertProvider />
          <GlobalModal />
        </>
      )}
    </div>
  );
};

export default App;
