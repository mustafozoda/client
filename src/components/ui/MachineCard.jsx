import React from "react";
import { useQuery } from "@tanstack/react-query";
import MachineChart from "./MachineChart";
import { fetchMachines } from "../../api/machinesApi";

const MachineCard = () => {
  const {
    data: machines,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["machines"],
    queryFn: fetchMachines,
  });

  if (isLoading) {
    return <div>Loading machines...</div>;
  }
  if (error) {
    return <div>Error loading machines</div>;
  }
  const cnt = machines ? machines.length : 0;
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="text-xl font-semibold">Machines</h1>
        <span className="text-4xl font-bold text-blue-500">{cnt}</span>
      </div>
      <div>
        <MachineChart />
      </div>
    </div>
  );
};

export default MachineCard;
