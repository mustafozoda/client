import React from "react";
import Header from "../layout/Header";
import ModalExample from "../components/ui/ModalExample";
import MachinesTable from "../components/ui/MachinesTable";
import MachineMaintenance from "../components/ui/MachineMaintenance";
import DateCalendarComponent from "../components/DateCalendarComponent";
const Machines = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header title="Machines" />

      <div className="z-10 mx-auto flex h-full flex-col items-center justify-center">
        <div className="hide-scrollbar mx-auto flex h-[80vh] w-full flex-row overflow-scroll">
          <div className="w-[2/3] px-5">
            <MachinesTable />
          </div>
          <div className="flex h-full w-[2/3] flex-col">
            <div className="flex h-1/2 w-full items-center justify-center">
              <MachineMaintenance />
            </div>
            <div className="h-1/2">{/* <DateCalendarComponent /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machines;
