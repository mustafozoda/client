import { useModalStore } from "../store/useModalStore";
import { SquarePen } from "lucide-react";
const Header = ({ title, style }) => {
  const { openModal } = useModalStore();
  return (
    <header className="flex h-[55px] items-center justify-self-start border-x border-[#d8d8d8] bg-[#FFFFFF] backdrop-blur-md transition-colors duration-300 ease-in-out dark:border-[#2B2B2B] dark:bg-[#171717]">
      <div className="flex w-full items-center justify-center p-[10px]">
        <div className="flex-1">
          <h1 className={`text-2xl ${style}`}>{title}</h1>
        </div>
        <div className="flex flex-1 justify-center">
          <button
            className="ml-[65%] flex h-[35px] w-[150px] origin-center transform items-center justify-center gap-2 rounded-[5px] bg-[#a1abae] shadow-lg transition-all duration-300 ease-in-out hover:w-[180px] focus:outline-none focus:ring-0 dark:bg-[#212121]"
            onClick={() => openModal()}
          >
            Create Item <SquarePen />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
