import React, { useState, useRef, useEffect } from "react";
import { UserRoundCog, LogOut, Settings, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <div
        className="py-[2px]  px-[20px] rounded-md space-x-1 text-[18px] flex items-center justify-center h-[30px] bg-[#FFFFFF] dark:bg-[#212121] cursor-pointer text-green-600"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <UserRoundCog size={20} style={{ color: "#16a34a" }} />
        <h1>User</h1>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 p-[5px] mt-2 w-40 bg-[#a1abae] dark:bg-[#212121]  rounded shadow-lg z-10">
          <div
            className="flex items-center py-[2px] px-[10px] rounded-sm hover:bg-[#0078D4] cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <UserRoundCog size={16} className="mr-2 text-white" />
            Profile
          </div>
          <hr className="border-[#2D2D2D]" />
          <div
            className="flex items-center py-[2px] px-[10px] rounded-sm hover:bg-[#0078D4] cursor-pointer"
            onClick={() => navigate("/settings")}
          >
            <Settings size={16} className="mr-2 text-white" />
            Settings
          </div>
          <hr className="border-[#2D2D2D]" />
          <div className="flex items-center py-[2px] px-[10px] rounded-sm hover:bg-[#EF4444] cursor-pointer">
            <LogOut size={16} className="mr-2 text-white" />
            Log Out
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
    </div>
  );
};

export default UserInfo;
