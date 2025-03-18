import React from "react";
import { Settings } from "lucide-react";

const Setting = () => {
  return (
    <div className="relative py-[2px] px-[25px] cursor-pointer rounded-md bg-[#FFFFFF] dark:bg-[#212121] h-[30px]   flex justify-center items-center">
      <Settings size={22} style={{ color: "6EE7B7" }} />
    </div>
  );
};

export default Setting;
