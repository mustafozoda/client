import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchMachines } from "../../api/machinesApi";

const COLORS = ["#28A745", "#FFC107", "#DC3545"];

const RADIAN = Math.PI / 180;

const statusMapping = {
  OPERATIONAL: 0,
  UNDER_MAINTENANCE: 1,
  OUT_OF_SERVICE: 2,
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const MachineChart = () => {
  const {
    data: responseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["machines"],
    queryFn: fetchMachines,
  });

  const machines = Array.isArray(responseData?.machines)
    ? responseData.machines
    : [];

  if (isLoading) return <p>Loading machines...</p>;
  if (error) return <p>Error loading machines</p>;

  const getStatusCounts = (machines) => {
    const counts = { OPERATIONAL: 0, UNDER_MAINTENANCE: 0, OUT_OF_SERVICE: 0 };

    machines.forEach((machine) => {
      if (statusMapping.hasOwnProperty(machine.status)) {
        counts[machine.status] += 1;
      } else {
        console.warn(`Unknown status encountered: ${machine.status}`);
      }
    });

    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .map(([name, value], index) => ({
        name,
        value,
        color: COLORS[statusMapping[name]],
      }));
  };

  // console.log("Machines Data: ", machines);
  // console.log(
  //   "Machine statuses:",
  //   machines.map((machine) => machine.status),
  // );

  const data = getStatusCounts(machines);

  if (data.length === 0) return <p>No machines available for the chart</p>;

  return (
    <div style={{ display: "flex", alignItems: "end" }}>
      <div style={{ marginRight: "20px", fontSize: "10px" }}>
        {Object.keys(statusMapping).map((status, index) => (
          <div
            key={status}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: COLORS[statusMapping[status]], // Color based on statusMapping
                marginRight: "10px",
              }}
            ></div>
            <span>{status.replace("_", " ")}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={170}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={75}
            fill="#8884d8"
            dataKey="value"
            innerRadius={42}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MachineChart;
