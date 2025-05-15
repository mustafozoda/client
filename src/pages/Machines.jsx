// import React from "react";
// import { SquarePen } from "lucide-react";
import Header from "../layout/Header";
import DateCalendarComponent from "../components/DateCalendarComponent";
import MachineMaintenance from "../components/machinesPage/MachineMaintenance";
import MaintenanceChart from "../components/machinesPage/MaintenanceChart";
import SearchFilter from "../components/machinesPage/SearchFilter";
import MachinesTable from "../components/machinesPage/MachinesTable";
// import { useModalStore } from "../store/useModalStore";

const Machines = () => {
  // const { openModal } = useModalStore();
  return (
    <div className="flex h-full w-full flex-col">
      <Header title="Machines" />
      <div className="z-10 mx-auto flex h-full w-[140vh]">
        <div className="left-side flex w-2/3 flex-col justify-around p-5">
          <div className="flex h-2/3 flex-col gap-[10px]">
            <SearchFilter />
            <MachinesTable />
          </div>
          <div className="h-1/3">
            <MaintenanceChart />
          </div>
        </div>

        <div className="right-side flex h-full w-1/3 flex-col justify-start gap-5 p-5">
          <MachineMaintenance />
          <div className="rounded-[15px] bg-white py-[15px] dark:bg-[#171717]">
            <DateCalendarComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machines;
