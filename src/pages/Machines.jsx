import React from "react";
import Header from "../layout/Header";
import ModalExample from "../components/ui/ModalExample";
import MachinesTable from "../components/ui/MachinesTable";
import MachineMaintenance from "../components/ui/MachineMaintenance";
import DateCalendarComponent from "../components/DateCalendarComponent";
import MaintenanceChart from "../components/ui/MaintenanceChart";
import SearchFilter from "../components/logic/SearchFilter";
import MaintenanceLogs from "./MaintenanceLogs";
const Machines = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header title="Machines" />
      <div className="z-10 mx-auto flex h-full w-[140vh]">
        <div className="left-side flex h-full w-1/3 flex-col justify-between p-5">
          <div>
            <MachineMaintenance />
          </div>
          <div className="rounded-[15px] bg-white py-[15px] dark:bg-[#171717]">
            <DateCalendarComponent />
          </div>
        </div>
        <div className="right-side flex w-2/3 flex-col justify-around p-5">
          <div className="flex h-2/3 flex-col gap-[10px]">
            <SearchFilter />
            <MachinesTable />
          </div>
          <div className="h-1/3">
            <MaintenanceChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machines;
