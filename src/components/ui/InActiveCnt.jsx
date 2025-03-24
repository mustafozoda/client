import React from "react";
import { fetchMachines } from "../../api/machinesApi";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "../SkeletonLoader";
import { Copy } from "lucide-react";
import { copyToClipboard } from "../../utils/copyUtils";

const InActiveCnt = () => {
  const {
    data: machines,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["machines"],
    queryFn: fetchMachines,
  });

  if (error) {
    console.error("Error loading machines:", error);
  }

  const totalMachines = machines?.length || 0;
  const machinesInActiveCnt =
    machines?.filter((machine) => machine.status === "Inactive").length || 0;

  const inactivePercentage = totalMachines
    ? ((machinesInActiveCnt / totalMachines) * 100).toFixed(2)
    : 0;

  return (
    <div className="h-full w-full items-center justify-center">
      {/* Show SkeletonLoader if loading or if error occurred */}
      {isLoading || error ? (
        <div className="flex h-full w-full items-center justify-center">
          <SkeletonLoader
            hideAvatar={false}
            hideTitle={false}
            hideSubheader={false}
            hideContent={false}
            hideRect={true}
          />
        </div>
      ) : (
        <div className="flex min-h-full min-w-full flex-col justify-between p-[10px]">
          <div className="flex min-h-full justify-between">
            <div>
              <h1>Inactive Machines</h1>
              <span className="text-[42px] text-blue-500">
                {machinesInActiveCnt}
              </span>
            </div>
            <div>
              <span className="cursor-pointer">
                <Copy
                  onClick={() => copyToClipboard(machinesInActiveCnt)}
                  size={24}
                />
              </span>
            </div>
          </div>
          <div className="h-full w-full">
            <span className="text-red-600">{inactivePercentage}% Inactive</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InActiveCnt;
