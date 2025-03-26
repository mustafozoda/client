import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchMachines } from "../../api/machinesApi";

const COLORS = ["#28A745", "#6C757D", "#FFC107"];

const RADIAN = Math.PI / 180;

const statusMapping = {
  Active: 2,
  Inactive: 1,
  Maintenance: 0,
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
    data: machines,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["machines"],
    queryFn: fetchMachines,
  });

  if (isLoading) return <p>Loading machines...</p>;
  if (error) return <p>Error loading machines</p>;

  const getStatusCounts = (machines) => {
    const counts = { Active: 0, Inactive: 0, "Under Maintenance": 0 };

    machines.forEach((machine) => {
      if (counts[machine.status] !== undefined) {
        counts[machine.status] += 1;
      }
    });

    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .map(([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length],
      }));
  };

  const data = machines ? getStatusCounts(machines) : [];

  if (data.length === 0) return <p>No machines available for the chart</p>;

  // console.log("Fetched machines:", machines);

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
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: "10px",
              }}
            ></div>
            <span>{status}</span>
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
            // blendStroke={true}
            innerRadius={42}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MachineChart;
