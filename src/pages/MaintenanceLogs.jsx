import React from "react";
import Header from "../layout/Header";

const MaintenanceLogs = () => {
  return (
    <div className="flex-1 flex overflow-auto flex-col relative z-10">
      <Header title="Maintenance Logs" />
      <div className="flex-1"></div>
    </div>
  );
};

export default MaintenanceLogs;
