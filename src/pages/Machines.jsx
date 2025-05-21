// import React from "react";
// import { SquarePen } from "lucide-react";
import Header from "../layout/Header";
import DateCalendarComponent from "../components/DateCalendarComponent";
import MachineMaintenance from "../components/machinesPage/MachineMaintenance";
import MaintenanceChart from "../components/machinesPage/MaintenanceChart";
import SearchFilter from "../components/machinesPage/SearchFilter";
import MachinesTable from "../components/machinesPage/MachinesTable";
// import { useModalStore } from "../store/useModalStore";
import { useTranslation } from "react-i18next";
const Machines = () => {
  const { t } = useTranslation("common");
  // const { openModal } = useModalStore();
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <Header title={t("machines")} />
      <div className="z-10 mx-auto flex h-full w-[90%] items-start justify-start pb-[10px]">
        <div className="left-side flex w-2/3 flex-col gap-[40px] p-5">
          <div className="flex flex-col gap-[10px]">
            <SearchFilter />
            <MachinesTable />
          </div>
          <div className="">
            <MaintenanceChart />
          </div>
        </div>

        <div className="right-side flex h-fit w-1/3 flex-col gap-[10px] p-5">
          <MachineMaintenance />
          <div className="h-fit overflow-hidden rounded-[15px] bg-white py-[15px] dark:bg-[#171717]">
            <DateCalendarComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machines;
