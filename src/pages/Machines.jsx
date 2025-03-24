import React from "react";
import Header from "../layout/Header";
import ModalExample from "../components/ui/ModalExample";
import MachinesTable from "../components/ui/MachinesTable";
const Machines = () => {
  return (
    <div className="relative z-10 flex h-full flex-1 flex-col gap-5">
      <Header title="Machines" />
      {/* 
      <ModalExample />
     */}

      <div className="hide-scrollbar flex h-[80vh] w-full flex-row overflow-scroll">
        <div className="w-[2/3] px-5">
          <MachinesTable />
        </div>
        <div className="w-[1/3]">sth</div>
      </div>
    </div>
  );
};

export default Machines;
