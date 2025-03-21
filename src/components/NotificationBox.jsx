import React from "react";
import { Bell } from "lucide-react";

const NotificationBox = ({}) => {
  const unreadCount = 1200;

  const displayCount =
    unreadCount > 99 ? "99+" : unreadCount > 9 ? "9+" : unreadCount;

  return (
    <div className="relative flex h-[30px] cursor-pointer items-center justify-center rounded-md bg-[#a1abae] px-[25px] py-[2px] transition-colors duration-300 ease-in-out dark:bg-[#212121]">
      <Bell size={22} className="text-[#6366f1]" />
      {unreadCount > 0 && (
        <span className="absolute -top-[9px] right-[10px] flex h-[30px] w-[10px] items-center justify-center rounded-full text-xs font-bold text-[#fb3131]">
          {displayCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBox;
