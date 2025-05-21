import React from "react";
import { fetchMachines } from "../../api/machinesApi";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "../SkeletonLoader";
import { Copy } from "lucide-react";
import { copyToClipboard } from "../../utils/copyUtils";
import { useTranslation } from "react-i18next";

const InActiveCnt = () => {
  const { t } = useTranslation("overview");
  const {
    data: responseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["machines"],
    queryFn: fetchMachines,
  });

  if (error) {
    console.error("Error loading machines:", error);
  }

  const machines = Array.isArray(responseData?.machines)
    ? responseData.machines
    : [];

  const totalMachines = machines.length;
  const machinesInActiveCnt = machines.filter(
    (machine) => machine.status === "OUT_OF_SERVICE",
  ).length;

  const inactivePercentage = totalMachines
    ? ((machinesInActiveCnt / totalMachines) * 100).toFixed(2)
    : 0;

  return (
    <div className="h-full w-full items-center justify-center">
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
              <h2>{t("inactiveMachines")}</h2>
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
            {/* <span className="text-red-600">{inactivePercentage}% Inactive</span>
             */}
            <span className="text-red-600">
              {t("inactivePercent", { value: `${inactivePercentage}%` })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InActiveCnt;
