import React from "react";
import { Settings } from "lucide-react";

const Setting = () => {
  return (
    <div className="relative flex h-[30px] cursor-pointer items-center justify-center rounded-md bg-[#a1abae] px-[10px] py-[2px] transition-colors duration-300 ease-in-out dark:bg-[#212121]">
      <Settings size={22} />
    </div>
  );
};

export default Setting;
