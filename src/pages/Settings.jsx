import React from "react";
import Header from "../layout/Header";
import ArticleCard from "../components/ArticleCard";
import DateCalendarComponent from "../components/DateCalendarComponent";
import InActiveCnt from "../components/ui/InActiveCnt";

const Settings = () => {
  return (
    <div className="relative z-10 flex flex-1 flex-col overflow-auto">
      <Header title="Settings" />
      <div className="flex flex-1 items-center justify-center">
        <div className="rounded-[5px] bg-white">
          <DateCalendarComponent />
        </div>
        <div>
          <InActiveCnt />
        </div>
      </div>
    </div>
  );
};

export default Settings;
