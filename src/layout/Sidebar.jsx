import {
  PanelLeftClose,
  PanelLeftOpen,
  Cable,
  ListTodo,
  CircleAlert,
  ChartArea,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Sidebar = ({ setDark }) => {
  const { t } = useTranslation("common");
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const SIDEBAR_ITEMS = [
    {
      name: t("overview"),
      icon: ChartArea,
      href: "/",
    },
    {
      name: t("machines"),
      icon: Cable,
      href: "/machines",
    },
    {
      name: t("tasks"),
      icon: ListTodo,
      href: "/tasks",
    },
    {
      name: t("reports"),
      icon: CircleAlert,
      href: "/reports",
    },
  ];

  return (
    <>
      <motion.div
        className={`relative z-10 flex-shrink-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
        animate={{ width: isSidebarOpen ? 256 : 70 }}
      >
        <div className="flex h-full flex-col bg-[#F9F9F9] p-4 backdrop-blur-md transition-colors duration-300 ease-in-out dark:border-r dark:border-[#2B2B2B] dark:bg-[#171717]">
          <nav className="flex-grow">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link key={item.href} to={item.href}>
                  <motion.div
                    className={`mb-2 flex items-center rounded-lg p-2 text-[17px] transition-colors ${
                      isActive
                        ? "bg-[#a1abae] transition-colors duration-300 ease-in-out dark:bg-[#212121]"
                        : "transition-colors duration-300 ease-in-out hover:bg-[#a1abae] dark:hover:bg-[#212121]"
                    }`}
                    whileHover={{ x: 7 }}
                  >
                    <item.icon
                      size={20}
                      style={{
                        color: item.color,
                        minWidth: "20px",
                      }}
                    />
                    <AnimatePresence>
                      {isSidebarOpen && (
                        <motion.span
                          className="ml-4 whitespace-nowrap"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* <div>
            <ThemeToggle setDark={setDark} />
          </div> */}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="max-w-fit rounded-full p-2 transition-colors hover:bg-[#212121]"
          >
            {isSidebarOpen ? (
              <PanelLeftClose size={24} color="green" />
            ) : (
              <PanelLeftOpen size={24} color="green" />
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
