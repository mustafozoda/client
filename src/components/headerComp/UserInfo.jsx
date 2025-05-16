// components/UserInfo.jsx
import React, { useState, useRef, useEffect } from "react";
import { UserRoundCog, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import UserModal from "./../UserModal";
import useAuthStore from "../../store/useAuthStore";
import { fetchUserByUsername } from "../../api/usersApi";

const UserInfo = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // logout modal
  const [isUserModalOpen, setIsUserModalOpen] = useState(false); // user-details modal
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // when Profile is clicked, fetch and open the modal
  const openProfileModal = async () => {
    try {
      const data = await fetchUserByUsername("bobojon"); // or grab current username
      setUser(data);
      setIsUserModalOpen(true);
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Failed to load user:", err);
    }
  };

  const handleLogout = () => setIsModalOpen(true);
  const confirmLogout = () => {
    logout();
    setIsModalOpen(false);
  };
  const cancelLogout = () => setIsModalOpen(false);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex h-[30px] cursor-pointer items-center justify-center space-x-1 rounded-md bg-[#a1abae] px-5 py-1 text-[18px] transition-colors duration-300 ease-in-out dark:bg-[#212121]"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <UserRoundCog size={20} />
        <h1>User</h1>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 rounded bg-[#a1abae] p-1 shadow-lg dark:bg-[#212121]">
          <div
            className="flex cursor-pointer items-center rounded-sm px-2 py-1 hover:bg-[#0078D4]"
            onClick={openProfileModal}
          >
            <UserRoundCog size={16} className="mr-2 text-white" />
            Profile
          </div>
          <hr className="border-[#2D2D2D]" />
          <div
            className="flex cursor-pointer items-center rounded-sm px-2 py-1 hover:bg-[#0078D4]"
            onClick={() => {
              setIsDropdownOpen(false);
              navigate("/settings");
            }}
          >
            <Settings size={16} className="mr-2 text-white" />
            Settings
          </div>
          <hr className="border-[#2D2D2D]" />
          <div
            className="flex cursor-pointer items-center rounded-sm px-2 py-1 hover:bg-[#EF4444]"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-2 text-white" />
            Log Out
          </div>
        </div>
      )}

      {/* logout confirmation */}
      <LogoutConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
      />

      {/* user-details modal */}
      <UserModal
        user={user}
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
    </div>
  );
};

export default UserInfo;
