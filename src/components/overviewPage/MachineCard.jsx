import React from "react";
import { useQuery } from "@tanstack/react-query";
import MachineChart from "./MachineChart";
import { fetchMachines } from "../../api/machinesApi";
import SkeletonLoader from "../SkeletonLoader";
import { copyToClipboard } from "../../utils/copyUtils";
import { Copy } from "lucide-react";
import { useTranslation } from "react-i18next";
const MachineCard = () => {
  const { t } = useTranslation("overview");
  const {
    data: responseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["machines"],
    queryFn: fetchMachines,
    refetchInterval: 1000,
  });

  const machines = Array.isArray(responseData?.machines)
    ? responseData.machines
    : [];
  // console.log(machines);

  if (isLoading) return <SkeletonLoader />;
  if (error) {
    console.error("Error loading machines:", error);
    return <p>Error loading machines. Please try again later.</p>;
  }

  const machineCounts = {
    OPERATIONAL: 0,
    OUT_OF_SERVICE: 0,
    UNDER_MAINTENANCE: 0,
  };

  machines.forEach((machine) => {
    switch (machine.status) {
      case "OPERATIONAL":
        machineCounts.OPERATIONAL += 1;
        break;
      case "OUT_OF_SERVICE":
        machineCounts.OUT_OF_SERVICE += 1;
        break;
      case "UNDER_MAINTENANCE":
        machineCounts.UNDER_MAINTENANCE += 1;
        break;
      default:
        console.warn(`Unknown status: ${machine.status}`);
        break;
    }
  });

  const copiedText = [
    t("copiedOperational", { count: machineCounts.OPERATIONAL }),
    t("copiedOutOfService", { count: machineCounts.OUT_OF_SERVICE }),
    t("copiedUnderMaintenance", { count: machineCounts.UNDER_MAINTENANCE }),
  ].join("\n");

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t("machines")}</h1>
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
