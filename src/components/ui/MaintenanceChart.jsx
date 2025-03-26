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
  Legend,
  CartesianGrid,
} from "recharts";

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

  useEffect(() => {
    fetchMachines().then((machines) => {
      const maintenanceCounts = monthsOrder.reduce((acc, month) => {
        acc[month] = 0;
        return acc;
      }, {});

      machines.forEach((machine) => {
        const month = new Date(machine.nextMaintenance).toLocaleString(
          "default",
          { month: "short" },
        );
        maintenanceCounts[month] += 1;
      });

      const chartData = monthsOrder.map((month) => ({
        month,
        count: maintenanceCounts[month],
        color: getColorForMonth(maintenanceCounts[month]),
      }));

      setData(chartData);
    });
  }, []);

  return (
    <div className="h-full w-full rounded-xl bg-white shadow-lg dark:bg-[#171717]">
      {/* <h2 className="mb-3 text-center text-lg font-bold">
        Maintenance Schedule
      </h2> */}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 10, bottom: 0, left: -20 }}
        >
          <CartesianGrid
            // stroke="green"
            strokeDasharray="5 5"
          />
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
          {/* <Legend /> */}
          <Bar dataKey="count" fill="#457b9d" barSize={15} />
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
            stroke="#1d3557"
            strokeWidth={4}
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
