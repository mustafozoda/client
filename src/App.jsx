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
  const { user, login } = useAuthStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    const syncTheme = () => setTheme(localStorage.getItem("theme") || "light");
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("storage", syncTheme);
    };
  }, [theme, setTheme]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser && !user) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.email) {
        login(parsedUser.email, "");
      }
    }
  }, [user, login]);

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
            <AppRoutes />
          </main>
          <div className="fixed inset-0 -z-10 border border-[#2B2B2B]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#171717] via-[#000000] to-[#212121] opacity-20" />
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>
          <CopyAlertProvider />
          <GlobalModal />
        </>
      )}
    </div>
  );
};

export default App;
