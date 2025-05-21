import React from "react";
import Header from "../layout/Header";
import TasksCard from "../components/overviewPage/TasksCard";
import MachineCard from "../components/overviewPage/MachineCard";
import WeatherApp from "../components/overviewPage/WeatherApp";
import ArticleCard from "../components/overviewPage/ArticleCard";
import Map from "../components/overviewPage/Map";
// import FloatingButton from "../components/FloatingButton";
import { useTranslation } from "react-i18next";
import InActiveCnt from "../components/overviewPage/InActiveCnt";
import ActiveCnt from "../components/overviewPage/ActiveCnt";
import TasksStatusCnt from "../components/overviewPage/TasksStatusCnt";
import InProgressTasksStatusCnt from "../components/overviewPage/InProgressTasksStatusCnt";
const Overview = () => {
  const { t } = useTranslation("common");
  return (
    <div className="z-10 flex w-full flex-col overflow-auto">
      <Header title={t("overview")} />

      <div className="mx-auto flex h-screen w-[80vw] flex-1 flex-col items-center justify-start">
        <div className="flex w-full items-center justify-center gap-7 p-[20px] px-[60px]">
          <div className="left-side grid h-full w-[45%] grid-cols-2 grid-rows-2">
            <div className="m-[10px] flex items-center justify-center rounded-[5px] bg-white transition-colors duration-300 ease-in-out dark:bg-[#171717]">
              <InActiveCnt />
            </div>
            <div className="m-[10px] flex items-center justify-center rounded-[5px] bg-white transition-colors duration-300 ease-in-out dark:bg-[#171717]">
              <ActiveCnt />
            </div>
            <div className="m-[10px] items-center justify-center rounded-[5px] bg-white transition-colors duration-300 ease-in-out dark:bg-[#171717]">
              <TasksStatusCnt />
            </div>
            <div className="box1 m-[10px] rounded-[5px] bg-white transition-colors duration-300 ease-in-out dark:bg-[#171717]">
              <InProgressTasksStatusCnt />
            </div>
          </div>

          <div className="right-side grid h-full w-[55%] grid-cols-2">
            <div className="box1 m-[5px] rounded-[5px] bg-white p-[15px] transition-colors duration-300 ease-in-out dark:bg-[#171717]">
              <TasksCard />
            </div>
            <div className="box1 m-[5px] rounded-[5px] bg-white p-[15px] transition-colors duration-300 ease-in-out dark:bg-[#171717]">
              <MachineCard />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-[10px] px-[65px]">
          <div className="h-full w-3/4">
            <ArticleCard />
          </div>
          <div className="flex w-1/4 flex-col gap-3 px-2 py-[8px]">
            <div className="w-full flex-1">
              <WeatherApp />
            </div>
            <div className="w-full flex-1">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
