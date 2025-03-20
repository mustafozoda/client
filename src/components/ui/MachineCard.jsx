import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MachineChart from "./MachineChart";
import { fetchMachines } from "../../api/machinesApi";
import { Copy } from "lucide-react";
import { handleCopy } from "../../components/Copy";
import Alert from "@mui/material/Alert";
import SkeletonLoader from "../../components/SkeletonLoader";

const MachineCard = () => {
  const [alertVisible, setAlertVisible] = useState(false);

  const {
    data: machines,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["machines"],
    queryFn: fetchMachines,
  });

  if (isLoading || error) {
    if (error) {
      console.error("Error loading machines:", error);
    }
    return <SkeletonLoader />;
  }

  // Count machines by status
  const machineCounts = {
    Active: machines.filter((machine) => machine.status === "Active").length,
    Inactive: machines.filter((machine) => machine.status === "Inactive")
      .length,
    Maintenance: machines.filter((machine) => machine.status === "Maintenance")
      .length,
    Offline: machines.filter((machine) => machine.status === "Offline").length,
  };

  // Format copied text
  const copiedText = `Active: ${machineCounts.Active} machines\nInactive: ${machineCounts.Inactive} machines\nMaintenance: ${machineCounts.Maintenance} machines\nOffline: ${machineCounts.Offline} machines`;

  const handleCopyAndShowAlert = () => {
    handleCopy(copiedText);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Machines</h1>
          <span className="text-4xl font-bold text-blue-500">
            {machines.length}
          </span>
        </div>
        <div className="cursor-pointer">
          <Copy size={30} onClick={handleCopyAndShowAlert} />
          {alertVisible && (
            <div
              style={{
                position: "fixed",
                right: "10px",
                bottom: "10px",
                zIndex: 9999,
              }}
            >
              <Alert severity="success">Copied to clipboard!</Alert>
            </div>
          )}
        </div>
      </div>
      <div>
        <MachineChart />
      </div>
    </div>
  );
};

export default MachineCard;
