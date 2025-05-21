import { useEffect, useState } from "react";
import { fetchMachines } from "../../api/machinesApi";
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Skeleton } from "@mui/material";
import SkeletonLoader from "../SkeletonLoader";

const getColorForMonth = (count) => {
  if (count > 6) return "#e63946";
  if (count > 3) return "#f4a261";
  return "#2a9d8f";
};

const monthsOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MaintenanceChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMachines()
      .then((machinesData) => {
        // console.log("Fetched machines data:", machinesData);

        const machines = Array.isArray(machinesData)
          ? machinesData
          : machinesData.machines || [];

        if (!Array.isArray(machines)) {
          throw new Error("Fetched machines data is not in an array format.");
        }

        const maintenanceCounts = monthsOrder.reduce((acc, month) => {
          acc[month] = 0;
          return acc;
        }, {});

        machines.forEach((machine) => {
          const month = new Date(
            machine.nextMaintenanceDateTime,
          ).toLocaleString("default", { month: "short" });
          if (maintenanceCounts.hasOwnProperty(month)) {
            maintenanceCounts[month] += 1;
          }
        });

        const chartData = monthsOrder.map((month) => ({
          month,
          count: maintenanceCounts[month],
          color: getColorForMonth(maintenanceCounts[month]),
        }));

        setData(chartData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error fetching machine data.");
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  if (isLoading)
    return (
      <SkeletonLoader
        hideAvatar={false}
        hideTitle={false}
        hideSubheader={false}
        hideContent={false}
        hideRect={true}
      />
    );

  if (error) return <p>{error}</p>;

  return (
    <div className="h-[30vh] w-full rounded-xl bg-white shadow-lg dark:bg-[#171717]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 10, bottom: 0, left: -20 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="month" className="text-xs" />
          <YAxis allowDecimals={false} />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                const { count, color } = payload[0].payload;
                return (
                  <div className="rounded border border-gray-300 bg-white p-2 text-black shadow-lg">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: color }}
                      ></span>
                      <span className="text-sm font-semibold">
                        {count} Machines Require Maintenance
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" fill="#457b9d" barSize={2} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="none"
            fillOpacity={0.5}
            fill="#1d3557"
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="green"
            strokeWidth={1.5}
            dot={({ cx, cy, payload }) => (
              <circle
                key={payload.month}
                cx={cx}
                cy={cy}
                r={4}
                fill={payload.color}
              />
            )}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaintenanceChart;
