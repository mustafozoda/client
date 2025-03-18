import React from "react";
import Header from "../layout/Header";

const Machines = () => {
  return (
    <div className="flex-1 flex flex-col relative z-10">
      <Header title="Machines" />
      <div className="p-[40px] flex flex-1">
        <div className="flex-1 " style={{ flex: "0 0 75%" }}>
          {/* <MachineList /> */}
        </div>
        <div className="flex-1" style={{ flex: "0 0 25%" }}></div>
      </div>
    </div>
  );
};

export default Machines;
