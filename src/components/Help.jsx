import React from "react";
import { BadgeHelp } from "lucide-react";

const Help = () => {
  return (
    <div className="relative py-[2px] px-[25px] cursor-pointer rounded-md bg-[#212121] h-[30px]   flex justify-center items-center">
      <BadgeHelp size={22} style={{ color: "F59E0B" }} />
    </div>
  );
};

export default Help;
