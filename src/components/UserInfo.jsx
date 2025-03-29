import React, { useState, useRef, useEffect } from "react";
import { UserRoundCog, LogOut, Settings, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoutConfirmationModal from "../components/ui/LogoutConfirmationModal";
import useAuthStore from "../store/useAuthStore";

const UserInfo = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsModalOpen(false);
    navigate("/");
    window.location.reload();
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex h-[30px] cursor-pointer items-center justify-center space-x-1 rounded-md bg-[#a1abae] px-[20px] py-[2px] text-[18px] transition-colors duration-300 ease-in-out dark:bg-[#212121]"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <UserRoundCog size={20} />
        <h1>User</h1>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 rounded bg-[#a1abae] p-[5px] shadow-lg dark:bg-[#212121]">
          <div
            className="flex cursor-pointer items-center rounded-sm px-[10px] py-[2px] hover:bg-[#0078D4]"
            onClick={() => navigate("/profile")}
          >
            <UserRoundCog size={16} className="mr-2 text-white" />
            Profile
          </div>
          <hr className="border-[#2D2D2D]" />
          <div
            className="flex cursor-pointer items-center rounded-sm px-[10px] py-[2px] hover:bg-[#0078D4]"
            onClick={() => navigate("/settings")}
          >
            <Settings size={16} className="mr-2 text-white" />
            Settings
          </div>
          <hr className="border-[#2D2D2D]" />
          <div
            className="flex cursor-pointer items-center rounded-sm px-[10px] py-[2px] hover:bg-[#EF4444]"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-2 text-white" />
            Log Out
          </div>
        </div>
      )}

      <LogoutConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default UserInfo;
