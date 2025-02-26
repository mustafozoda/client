import React, { createContext, useContext, useState, useEffect } from "react";

export const MachineContext = createContext();

export const MachineProvider = ({ children }) => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://192.168.200.171:3000/machines")
      .then((res) => res.json())
      .then((data) => {
        setMachines(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <MachineContext.Provider value={{ machines, loading, error }}>
      {children}
    </MachineContext.Provider>
  );
};

export const useMachines = () => {
  return useContext(MachineContext);
};
