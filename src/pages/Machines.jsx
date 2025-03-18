import React from "react";
import Header from "../layout/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchMachines } from "../api/machinesApi";
const Machines = () => {
  const {
    data: machines,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["machines"],
    queryFn: fetchMachines,
  });
  if (isLoading) return <p>Loading machines...</p>;
  if (error) return <p>Error loading machines</p>;
  return (
    <div className="flex-1 flex flex-col relative z-10">
      <Header title="Machines" />
      <div>
        {machines.map((machine) => (
          <h1 key={machine.id}>{machine.name}</h1>
        ))}
      </div>
    </div>
  );
};

export default Machines;
