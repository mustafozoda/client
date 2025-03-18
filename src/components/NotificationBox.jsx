import React from "react";
import { Bell } from "lucide-react";

const NotificationBox = ({}) => {
  const unreadCount = 1200;

  const displayCount =
    unreadCount > 99 ? "99+" : unreadCount > 9 ? "9+" : unreadCount;

  return (
    <div className="relative py-[2px] px-[25px] cursor-pointer rounded-md bg-[#FFFFFF] dark:bg-[#212121] h-[30px]   flex justify-center items-center">
      <Bell size={22} className=" text-[#6366f1]   " />
      {unreadCount > 0 && (
        <span className="absolute -top-[9px]  right-[10px] flex items-center justify-center w-[10px] h-[30px] text-xs font-bold text-[#fb3131]  rounded-full">
          {displayCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBox;
