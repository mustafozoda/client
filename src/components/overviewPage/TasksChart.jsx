import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../../api/tasksApi";
import { useTranslation } from "react-i18next";

const COLORS = ["#22c55e", "#fde047", "#ef4444"];

const RADIAN = Math.PI / 180;

const priorityMapping = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

const priorityTranslationMap = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.45;
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
  const { t } = useTranslation("overview");

  const {
    data: responseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const tasks = Array.isArray(responseData?.tasks) ? responseData.tasks : [];

  if (isLoading) return <p>{t("loadingTasks")}</p>;
  if (error) return <p>{t("errorLoadingTasks")}</p>;

  const getPriorityCounts = (tasks) => {
    const counts = { LOW: 0, MEDIUM: 0, HIGH: 0 };

    tasks.forEach((task) => {
      if (counts[task.priority] !== undefined) {
        counts[task.priority] += 1;
      } else {
        console.warn(`Unknown priority encountered: ${task.priority}`);
      }
    });

    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .sort(([a], [b]) => priorityMapping[a] - priorityMapping[b]) // sort by priority
      .map(([name, value], index) => ({
        name,
        value,
        color: COLORS[priorityMapping[name] - 1], // fixed mapping
      }));
  };

  const data = getPriorityCounts(tasks);

  if (data.length === 0) return <p>{t("noTasksChart")}</p>;

  return (
    <div style={{ display: "flex", position: "relative", alignItems: "end" }}>
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
            <span>{t(priorityTranslationMap[priority])}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer
        className={"absolute left-[20%] z-50"}
        width="100%"
        height={170}
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={"100%"}
            fill="#8884d8"
            dataKey="value"
            innerRadius={"50%"}
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

export default TasksChart;
