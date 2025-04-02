import { SquarePen } from "lucide-react";
import { useModalStore } from "../store/useModalStore";
import { useLocation } from "react-router-dom";

const Header = ({ title, style }) => {
  const { openModal } = useModalStore();
  const location = useLocation();

  // Only show button if we're on /machines or /tasks
  const shouldShowButton =
    location.pathname === "/machines" || location.pathname === "/tasks";

  return (
    <header className="flex h-[55px] items-center justify-self-start border-b border-[#d8d8d8] bg-[#a1abae] backdrop-blur-md transition-colors duration-300 ease-in-out dark:border-[#2B2B2B] dark:bg-[#212121]">
      <div className="flex w-full items-center justify-between p-[10px]">
        <div className="">
          <h1 className={`text-2xl ${style}`}>{title}</h1>
        </div>
        {shouldShowButton && (
          <div className="flex justify-end">
            <button
              className="flex h-[35px] w-[150px] items-center justify-center gap-2 rounded-[5px] bg-white shadow-lg focus:outline-none focus:ring-0 dark:bg-[#171717]"
              onClick={() => openModal()}
            >
              Create New
              <SquarePen />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
