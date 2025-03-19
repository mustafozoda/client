import React from "react";
import Header from "../layout/Header";
import TasksCard from "../components/ui/TasksCard";
import MachineCard from "../components/ui/MachineCard";

const Overview = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 flex flex-col">
      <Header title="Overview" />
      <div className="flex-1 flex">
        {/* Left section of the layout */}
        <div className="w-full border-b gap-7 flex px-[60px] p-[20px] h-[50%]">
          <div className="left-side grid grid-cols-2 grid-rows-2 w-[45%] h-full">
            {/* Boxes can be filled with other data or content */}
            <div className="box1 m-[10px] rounded-2xl dark:bg-[#171717] bg-white"></div>
            <div className="box1 m-[10px] rounded-2xl dark:bg-[#171717] bg-white"></div>
            <div className="box1 m-[10px] rounded-2xl dark:bg-[#171717] bg-white"></div>
            <div className="box1 m-[10px] rounded-2xl dark:bg-[#171717] bg-white"></div>
          </div>

          <div className="left-side grid grid-cols-2 w-[55%] h-full">
            <div className="box1 m-[10px] p-[15px]  rounded-2xl dark:bg-[#171717] bg-white">
              <TasksCard />
            </div>
            <div className="box1 m-[10px] p-[15px]  rounded-2xl dark:bg-[#171717] bg-white">
              <MachineCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
