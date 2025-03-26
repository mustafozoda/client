import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MachineChart from "./MachineChart";
import { fetchMachines } from "../../api/machinesApi";
import SkeletonLoader from "../../components/SkeletonLoader";
import { copyToClipboard } from "../../utils/copyUtils";
import { Copy } from "lucide-react";

const MachineCard = () => {
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

  const machineCounts = {
    Active: machines.filter((machine) => machine.status === "Active").length,
    Inactive: machines.filter((machine) => machine.status === "Inactive")
      .length,
    Maintenance: machines.filter((machine) => machine.status === "Maintenance")
      .length,
    Offline: machines.filter((machine) => machine.status === "Offline").length,
  };

  const copiedText = `Active: ${machineCounts.Active} machines\nInactive: ${machineCounts.Inactive} machines\nMaintenance: ${machineCounts.Maintenance} machines\nOffline: ${machineCounts.Offline} machines`;

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
          <Copy size={30} onClick={() => copyToClipboard(copiedText)} />
        </div>
      </div>
      <div>
        <MachineChart />
      </div>
    </div>
  );
};

export default MachineCard;
