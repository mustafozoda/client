import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/ELTE.png";
import Search from "../components/Search";
import NotificationBox from "../components/NotificationBox";
import UserInfo from "../components/UserInfo";
import Setting from "../components/Setting";
import CalculatorUi from "../components/CalculatorUi";
const DropdownMenu = ({ isOpen, options, onClose }) => {
  return (
    isOpen && (
      <div className="absolute left-0 z-10 mt-2 w-40 rounded bg-[#a1abae] p-[5px] shadow-lg dark:bg-[#212121]">
        {options.map((option, index) => (
          <div>
            <div
              key={index}
              className="cursor-pointer rounded-sm px-[10px] py-[2px] hover:bg-[#0078D4]"
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
    <nav className="left-0 top-0 z-50 flex h-[50px] w-full items-center space-x-[15px] border-b border-[#d8d8d8] bg-[#FFFFFF] px-[22px] backdrop-blur-md transition-colors duration-300 ease-in-out dark:border-[#2B2B2B] dark:bg-[#171717]">
      <div
        className="m-0 flex flex-1 items-center justify-start space-x-[10px] p-0"
        ref={dropdownRef}
      >
        <div className="flex w-[30px] items-center space-x-[10px]">
          <img src={logo} alt="logo-of-university" />
        </div>
        <div className="relative">
          <button
            className="rounded bg-[#a1abae] px-[20px] py-[2px] transition-colors duration-300 ease-in-out hover:bg-[#3B3B3B] dark:bg-[#212121]"
            onClick={() => toggleDropdown(1)}
            onMouseEnter={() => hasClicked && handleMouseEnter(1)}
          >
            Button
          </button>
          <DropdownMenu
            isOpen={activeDropdown === 1}
            options={options1}
            onClose={() => setActiveDropdown(null)}
          />
        </div>
        <div className="relative">
          <button
            className="rounded bg-[#a1abae] px-[20px] py-[2px] transition-colors duration-300 ease-in-out hover:bg-[#3B3B3B] dark:bg-[#212121]"
            onClick={() => toggleDropdown(2)}
            onMouseEnter={() => hasClicked && handleMouseEnter(2)}
          >
            Button
          </button>
          <DropdownMenu
            isOpen={activeDropdown === 2}
            options={options2}
            onClose={() => setActiveDropdown(null)}
          />
        </div>
        <div className="relative">
          <button
            className="rounded bg-[#a1abae] px-[20px] py-[2px] transition-colors duration-300 ease-in-out hover:bg-[#3B3B3B] dark:bg-[#212121]"
            onClick={() => toggleDropdown(3)}
            onMouseEnter={() => hasClicked && handleMouseEnter(3)}
          >
            Button
          </button>
          <DropdownMenu
            isOpen={activeDropdown === 3}
            options={options3}
            onClose={() => setActiveDropdown(null)}
          />
        </div>
      </div>

      <div className="flex w-full flex-1 justify-center">
        <Search />
      </div>

      <div className="hover:maou flex flex-1 items-center justify-end space-x-[10px]">
        <NotificationBox />
        <CalculatorUi />
        <Setting />
        <UserInfo />
      </div>
    </nav>
  );
};

export default Navbar;
