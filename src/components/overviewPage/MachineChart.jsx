import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchMachines } from "../../api/machinesApi";
import { useTranslation } from "react-i18next";

const COLORS = ["#28A745", "#FFC107", "#DC3545"];
const RADIAN = Math.PI / 180;

// Backend status mapping
const statusMapping = {
  OPERATIONAL: 0,
  UNDER_MAINTENANCE: 1,
  OUT_OF_SERVICE: 2,
};

// Translation keys for i18n
const statusTranslationMap = {
  OPERATIONAL: "operational",
  UNDER_MAINTENANCE: "underMaintenance",
  OUT_OF_SERVICE: "outOfService",
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
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
  const { t } = useTranslation("overview");

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

  if (isLoading) return <p>{t("loadingMachines")}</p>;
  if (error) return <p>{t("errorLoadingMachines")}</p>;

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
      .map(([name, value]) => ({
        name,
        value,
        color: COLORS[statusMapping[name]],
      }));
  };

  const data = getStatusCounts(machines);

  if (data.length === 0) return <p>{t("noMachinesChart")}</p>;

  return (
    <div style={{ display: "flex", position: "relative", alignItems: "end" }}>
      <div style={{ marginRight: "20px", fontSize: "10px" }}>
        {Object.keys(statusMapping).map((status) => (
          <div
            key={status}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: COLORS[statusMapping[status]],
                marginRight: "10px",
              }}
            ></div>
            <span>{t(statusTranslationMap[status])}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer
        width="100%"
        className={"absolute left-[20%] z-50"}
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

export default MachineChart;
