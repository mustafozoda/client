import {
  Maximize2,
  Minimize2,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
  LogOut,
  BarChart2,
  Wrench,
  ClipboardList,
  CircleAlert,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: BarChart2,
    color: "#6366f1",
    href: "/",
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
  {
    name: "Log Out",
    icon: LogOut,
    color: "#EF4444",
    href: "/logout",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 77 }}
    >
      <div
        className={`h-full  bg-[#171717]  backdrop-blur-md p-4 
         flex flex-col border-r border-[#2B2B2B]`}
      >
        <nav className=" flex-grow">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <Link key={item.href} to={item.href}>
                <motion.div
                  className={`flex text-gray-300 items-center p-3 text-sm font-medium rounded-lg transition-colors mb-2 ${
                    isActive ? "bg-[#212121] " : "hover:bg-[#212121]"
                  }`}
                  whileHover={{
                    x: 7,
                    // boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  }}
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
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-[#212121] transition-colors max-w-fit"
        >
          {isSidebarOpen ? (
            <PanelLeftClose size={24} color="white" />
          ) : (
            <PanelLeftOpen ize2 size={24} color="white" />
          )}
        </motion.button>
        <div>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider> */}
        </div>
      </div>
    </motion.div>
  );
};
export default Sidebar;
