import {
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
  LogOut,
  BarChart2,
  Wrench,
  ClipboardList,
  CircleAlert,
  ChartArea,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const Sidebar = ({ setDark }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const SIDEBAR_ITEMS = [
    { name: "Overview", icon: ChartArea, color: "#6366f1", href: "/" },
    {
      name: "Dashboard",
      icon: BarChart2,
      color: "#6366f1",
      href: "/dashboard",
    },
    {
      name: "Machines",
      icon: Wrench,
      color: "#6EE7B7",
      href: "/machines",
    },
    {
      name: "Maintenance Logs",
      icon: ClipboardList,
      color: "#8B5CF6",
      href: "/maintenance-logs",
    },
    {
      name: "Issue Reports",
      icon: CircleAlert,
      color: "#F59E0B",
      href: "/issue-reports",
    },
    {
      name: "User Management",
      icon: Users,
      color: "#3B82F6",
      href: "/user-management",
    },
    {
      name: "Settings",
      icon: Settings,
      color: "#6EE7B7",
      href: "/settings",
    },
  ];

  return (
    <>
      <motion.div
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
        animate={{ width: isSidebarOpen ? 256 : 77 }}
      >
        <div className="h-full dark:bg-[#171717] bg-[#F9F9F9] backdrop-blur-md p-4 flex flex-col dark:border-r dark:border-[#2B2B2B]">
          <nav className="flex-grow">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link key={item.href} to={item.href}>
                  <motion.div
                    className={`flex items-center p-3 text-sm font-medium rounded-lg transition-colors mb-2 ${
                      isActive
                        ? "bg-[#a1abae] dark:bg-[#212121]"
                        : "dark:hover:bg-[#212121] hover:bg-[#a1abae]"
                    }`}
                    whileHover={{ x: 7 }}
                  >
                    <item.icon
                      size={20}
                      style={{ color: item.color, minWidth: "20px" }}
                    />
                    <AnimatePresence>
                      {isSidebarOpen && (
                        <motion.span
                          className="ml-4 whitespace-nowrap"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2, delay: 0.3 }}
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

          <div>
            <ThemeToggle setDark={setDark} />
          </div>

          {/* Sidebar Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-[#212121] transition-colors max-w-fit"
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
