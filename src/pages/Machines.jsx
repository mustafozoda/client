import React, { useState } from "react";
import Header from "../layout/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchMachines } from "../api/machinesApi";
import { handleCopy } from "../components/Copy";
import Alert from "@mui/material/Alert";

const Machines = () => {
  const {
    data: machines,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["machines"],
    queryFn: fetchMachines,
  });

  const [alertVisible, setAlertVisible] = useState(false);

  const handleCopyAndShowAlert = () => {
    handleCopy(machines.length);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  if (isLoading) return <p>Loading machines...</p>;
  if (error) return <p>Error loading machines</p>;

  return (
    <div className="flex-1 flex flex-col relative z-10">
      <Header title="Machines" />
      <div>
        {machines.map((machine) => (
          <h1 key={machine.id}>{machine.name}</h1>
        ))}
        <button onClick={handleCopyAndShowAlert}>Copy Machines Count</button>
        <h1>Total Machines: {machines.length}</h1>
        {alertVisible && (
          <div
            style={{
              position: "fixed",
              right: "10px",
              bottom: "10px",
              zIndex: 9999,
            }}
          >
            <Alert severity="success">
              Machines count copied successfully!
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default Machines;
