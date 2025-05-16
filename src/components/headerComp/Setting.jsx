// src/components/headerComp/Setting.jsx
import React, { useState, useRef, useEffect } from "react";
import { Settings, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useThemeStore from "../../store/useThemeStore";

const Setting = () => {
  const { theme, setTheme } = useThemeStore();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-[30px] cursor-pointer items-center justify-center rounded-md bg-[#a1abae] px-[10px] py-[2px] transition-colors duration-300 ease-in-out dark:bg-[#212121]"
      >
        <Settings size={22} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-40 space-y-1 rounded-md bg-white p-2 shadow-lg dark:bg-[#212121]"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex cursor-pointer items-center gap-2 rounded px-3 py-1 hover:bg-blue-600 hover:text-white"
              onClick={() => {
                setTheme("light");
                setOpen(false);
              }}
            >
              <Sun size={16} />
              <span className="text-sm">Light Mode</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex cursor-pointer items-center gap-2 rounded px-3 py-1 hover:bg-blue-600 hover:text-white"
              onClick={() => {
                setTheme("dark");
                setOpen(false);
              }}
            >
              <Moon size={16} />
              <span className="text-sm">Dark Mode</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Setting;
