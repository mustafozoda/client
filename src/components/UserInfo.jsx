import React from "react";
import { UserRoundCog } from "lucide-react";
const UserInfo = () => {
  return (
    <div className="py-[2px] px-[20px] rounded-md space-x-1 text-[18px] flex items-center justify-center h-[30px] bg-[#212121] cursor-pointer text-green-600">
      <UserRoundCog size={20} style={{ color: "#16a34a" }} />
      <h1>User</h1>
    </div>
  );
};

export default UserInfo;
