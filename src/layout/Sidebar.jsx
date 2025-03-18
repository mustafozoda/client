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
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const Sidebar = ({ setDark }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const SIDEBAR_ITEMS = [
    {
      name: "Dashboard",
      icon: BarChart2,
      color: "#6366f1",
      href: "/",
      roles: ["admin", "manager", "technician"],
    },
    {
      name: "Machines",
      icon: Wrench,
      color: "#6EE7B7",
      href: "/machines",
      roles: ["admin", "manager"],
    },
    {
      name: "Maintenance Logs",
      icon: ClipboardList,
      color: "#8B5CF6",
      href: "/maintenance-logs",
      roles: ["admin", "manager"],
    },
    {
      name: "Issue Reports",
      icon: CircleAlert,
      color: "#F59E0B",
      href: "/issue-reports",
      roles: ["admin", "manager", "technician"],
    },
    {
      name: "User Management",
      icon: Users,
      color: "#3B82F6",
      href: "/user-management",
      roles: ["admin"],
    },
    {
      name: "Settings",
      icon: Settings,
      color: "#6EE7B7",
      href: "/settings",
      roles: ["admin", "manager"],
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
        <div className="h-full bg-[#171717] backdrop-blur-md p-4 flex flex-col border-r border-[#2B2B2B]">
          <nav className="flex-grow">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link key={item.href} to={item.href}>
                  <motion.div
                    className={`flex text-gray-300 items-center p-3 text-sm font-medium rounded-lg transition-colors mb-2 ${
                      isActive ? "bg-[#212121]" : "hover:bg-[#212121]"
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

            {/* Log Out Button */}
            {/* <button
              onClick={() => setIsModalOpen(true)}
              className="flex text-gray-300 items-center p-3 text-sm font-medium rounded-lg transition-colors mb-2 hover:bg-[#212121] w-full"
            >
              <LogOut
                size={20}
                style={{ color: "#EF4444", minWidth: "20px" }}
              />
              {isSidebarOpen && <span className="ml-4">Log Out</span>}
            </button> */}
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
              <PanelLeftClose size={24} color="white" />
            ) : (
              <PanelLeftOpen size={24} color="white" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center h-screen w-screen justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-[#212121] text-white p-6 rounded-lg shadow-lg w-[400px] text-center"
          >
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="text-sm text-gray-400">
              Do you really want to log out?
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
