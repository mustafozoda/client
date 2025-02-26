import AppRoutes from "./AppRoutes.jsx";
import Sidebar from "./layout/Sidebar.jsx";
// import { UserProvider } from "./context/UserContext.jsx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "./layout/Navbar.jsx";

const App = () => {
  // ----------------------------------------------------------------------------------------------
  // efects
  // ----------------------------------------------------------------------------------------------

  useEffect(() => {
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

  // ----------------------------------------------------------------------------------------------
  return (
    // <UserProvider>
    <div className="h-screen flex flex-col bg-[#212121] overflow-hidden">
      <div className="flex flex-col flex-1">
        <Navbar />

        <main className=" flex flex-1   ">
          <Sidebar />

          <AppRoutes />
        </main>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 border border-[#2B2B2B]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#171717] via-[#000000] to-[#212121] opacity-20" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
    </div>
    // </UserProvider>
  );
};

export default App;
