import React from "react";
import Header from "../layout/Header";
import MaintenanceChart from "../components/ui/MaintenanceChart";

const MaintenanceLogs = () => {
  return (
    <div className="relative z-10 flex flex-1 flex-col overflow-auto">
      <Header title="Maintenance Logs" />
      <div className="h-full w-4/5 flex-1">
        <MaintenanceChart />
      </div>
    </div>
  );
};

export default MaintenanceLogs;
