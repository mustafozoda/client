import React from "react";
import Header from "../layout/Header";
import EditMachineModal from "../components/ui/EditMachineModal";
import DateCalendarComponent from "../components/DateCalendarComponent";

const Settings = () => {
  return (
    <div className="relative z-10 flex flex-1 flex-col overflow-auto">
      <Header title="Settings" />
      <div className="flex flex-1 items-center justify-center">
        <EditMachineModal />
      </div>
    </div>
  );
};

export default Settings;
