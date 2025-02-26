import React from "react";
import { useMachines } from "../context/MachineContext";
const MachineList = () => {
  const { machines, loading, error, refetch } = useMachines();

  if (loading) return <p className="text-center mt-4">Loading machines...</p>;
  if (error)
    return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

  const calculateDaysLeft = (nextMaintenanceDue) => {
    const today = new Date();
    const nextMaintenanceDate = new Date(nextMaintenanceDue);
    const timeDifference = nextMaintenanceDate - today;
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft >= 0 ? daysLeft : 0;
  };
  return (
    <div className="text-gray-300">
      <button
        className="bg-[#171717] py-[5px] px-[10px] rounded-md hover:bg-[#3B3B3B] mb-[10px]"
        onClick={refetch}
      >
        Reload Machines
      </button>
      {machines && machines.length > 0 ? (
        <div
          className="overflow-auto hide-scrollbar"
          style={{ maxHeight: "55vh" }}
        >
          <table className="min-w-full bg-gray-800 ">
            <thead className="">
              <tr className="text-left">
                <th className="py-2  px-4   ">Machine ID</th>
                <th className="py-2  px-4">Name</th>
                <th className="py-2  px-4">Status</th>
                <th className="py-2  px-4">Type</th>
                <th className="py-2  px-4">Last Maintenance</th>
                <th className="py-2  px-4   ">Next Maintenance Due</th>
                <th className="py-2  px-4   ">Days Left</th>
              </tr>
            </thead>
            <tbody className="">
              {machines.map((machine) => (
                <tr key={machine.machine_id} className="hover:bg-gray-700">
                  <td className="py-2 px-4">{machine.machine_id}</td>
                  <td className="py-2 px-4">{machine.name}</td>
                  <td className="py-2 px-4">{machine.status}</td>
                  <td className="py-2 px-4">{machine.type}</td>
                  <td className="py-2 px-4">{machine.last_maintenance}</td>
                  <td className="py-2 px-4">{machine.next_maintenance}</td>
                  <td className="py-2 px-4">
                    {calculateDaysLeft(machine.next_maintenance)}
                  </td>
                  {console.log(machine.status)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-4">No machines available</p>
      )}
    </div>
  );
};

export default MachineList;
