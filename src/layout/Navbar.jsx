import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/ELTE.png";
import Search from "../components/Search";
import NotificationBox from "../components/NotificationBox";
import UserInfo from "../components/UserInfo";
const DropdownMenu = ({ isOpen, options, onClose }) => {
  return (
    isOpen && (
      <div className="absolute p-[5px] left-0 mt-2 w-40 bg-[#212121] text-[#D1D5DB] rounded shadow-lg z-10">
        {options.map((option, index) => (
          <div>
            <div
              key={index}
              className="py-[2px] px-[10px] rounded-sm hover:bg-[#0078D4] cursor-pointer"
              onClick={onClose}
            >
              {option}
            </div>
            <hr className="border-[#2D2D2D]" />
          </div>
        ))}
      </div>
    )
  );
};

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hasClicked, setHasClicked] = useState(false);
  const dropdownRef = useRef(null);

  const options1 = ["Option 1", "Option 2", "Option 3"];
  const options2 = ["Option A", "Option B", "Option C"];
  const options3 = ["Setting 1", "Setting 2", "Setting 3"];

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    setHasClicked(true);
  };

  const handleMouseEnter = (dropdown) => {
    if (hasClicked && activeDropdown !== dropdown) {
      setActiveDropdown(dropdown);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
      setHasClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="top-0 left-0 px-[22px]  font-mono w-full h-[40px]  bg-[#171717] backdrop-blur-md text-gray-300 border-b border-[#2D2D2D]  z-50 flex items-center  space-x-[15px]">
      <div
        className="flex justify-start items-center flex-1 space-x-[5px]"
        ref={dropdownRef}
      >
        <div className="flex w-[30px] items-center space-x-[10px]">
          <img src={logo} alt="logo-of-university" />
        </div>
        <div className="relative">
          <button
            className="bg- hover:bg-[#3B3B3B]  py-[2px] px-[10px] rounded transition"
            onClick={() => toggleDropdown(1)}
            onMouseEnter={() => hasClicked && handleMouseEnter(1)}
          >
            Button 1
          </button>
          <DropdownMenu
            isOpen={activeDropdown === 1}
            options={options1}
            onClose={() => setActiveDropdown(null)}
          />
        </div>
        <div className="relative">
          <button
            className=" hover:bg-[#3B3B3B] py-[2px] px-[10px] rounded transition"
            onClick={() => toggleDropdown(2)}
            onMouseEnter={() => hasClicked && handleMouseEnter(2)}
          >
            Button 2
          </button>
          <DropdownMenu
            isOpen={activeDropdown === 2}
            options={options2}
            onClose={() => setActiveDropdown(null)}
          />
        </div>
        <div className="relative">
          <button
            className=" hover:bg-[#3B3B3B] py-[2px] px-[10px] rounded transition"
            onClick={() => toggleDropdown(3)}
            onMouseEnter={() => hasClicked && handleMouseEnter(3)}
          >
            Button 3
          </button>
          <DropdownMenu
            isOpen={activeDropdown === 3}
            options={options3}
            onClose={() => setActiveDropdown(null)}
          />
        </div>
      </div>

      <div className="flex-1 w-full flex justify-center">
        <Search />
      </div>

      <div className="flex-1 hover:maou items-center space-x-[20px] flex justify-end">
        <NotificationBox />
        <UserInfo size={22} style={{ color: "#6366f1" }} />
      </div>
    </nav>
  );
};

export default Navbar;
