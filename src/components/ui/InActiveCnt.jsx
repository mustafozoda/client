import React from "react";
import { fetchMachines } from "../../api/machinesApi";
import { useQuery } from "@tanstack/react-query";

const InActiveCnt = () => {
  const {
    data: machines,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["machines"],
    queryFn: fetchMachines,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error loading machines:", error);
    return <div>Error loading machines.</div>;
  }

  const totalMachines = machines.length;
  const machinesInActiveCnt = machines.filter(
    (machine) => machine.status === "Inactive",
  ).length;

  const inactivePercentage = totalMachines
    ? ((machinesInActiveCnt / totalMachines) * 100).toFixed(2)
    : 0;

  return (
    <div className="m-[5px] grid h-full w-full grid-cols-2 grid-rows-2 border border-black">
      <div>
        <h1>Inactive Machines</h1>
        <span>{machinesInActiveCnt}</span>
      </div>
      <div>X</div>
      <div className="row-span-2">
        <p>{inactivePercentage}, of totall </p>
      </div>
    </div>
  );
};

export default InActiveCnt;
