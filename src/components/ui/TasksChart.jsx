import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../../api/tasksApi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

const priorityMapping = {
  Urgent: 4,
  High: 3,
  Normal: 2,
  Low: 1,
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
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
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

const TasksChart = () => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks</p>;

  const getPriorityCounts = (tasks) => {
    const counts = { Urgent: 0, High: 0, Normal: 0, Low: 0 };

    tasks.forEach((task) => {
      if (counts[task.priority] !== undefined) {
        counts[task.priority] += 1;
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

  const data = tasks ? getPriorityCounts(tasks) : [];

  if (data.length === 0) return <p>No tasks available for the chart</p>;

  console.log("Fetched tasks:", tasks);

  return (
    <div style={{ display: "flex", alignItems: "end" }}>
      {/* Legend */}
      <div style={{ marginRight: "20px", fontSize: "10px" }}>
        {Object.keys(priorityMapping).map((priority, index) => (
          <div
            key={priority}
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
            <span>{priority}</span>
          </div>
        ))}
      </div>
      {/* Chart */}
      <ResponsiveContainer width="100%" height={170}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
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

export default TasksChart;
