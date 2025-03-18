import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";

const App = () => {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    // Prevent Zooming
    const preventZoomKeys = (event) => {
      if (
        event.ctrlKey &&
        (event.key === "=" || event.key === "-" || event.key === "0")
      ) {
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
    <div className="h-screen flex flex-col dark:text-gray-300  bg-[#a1abae] dark:bg-[#212121] overflow-hidden">
      <Navbar />
      <main className="flex flex-1">
        <Sidebar setDark={setDark} />
        <AppRoutes dark={dark} />
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
