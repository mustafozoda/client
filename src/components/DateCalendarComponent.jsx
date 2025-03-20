import * as React from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { fetchMachines } from "../api/machinesApi";
import Tooltip from "@mui/material/Tooltip";

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const today = dayjs().startOf("day");
  const formattedHighlightedDays = highlightedDays.map((d) =>
    dayjs(d).startOf("day"),
  );
  const matchedDay = formattedHighlightedDays.find((d) => d.isSame(day, "day"));
  const isSelected = Boolean(matchedDay);
  const daysLeft = isSelected ? matchedDay.diff(today, "day") : null;
  const tooltipMessage = isSelected
    ? daysLeft === 0
      ? "Today - Maintenance scheduled"
      : `${Math.abs(daysLeft)} days left - Maintenance scheduled`
    : "No maintenance scheduled";
  return (
    <Tooltip title={tooltipMessage} arrow>
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isSelected ? "•" : undefined}
        sx={{
          "& .MuiBadge-badge": {
            color: "red",
            fontSize: "2rem",
            borderRadius: "50%",
          },
        }}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    </Tooltip>
  );
}
export default function DateCalendarComponent({ cusWidth }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const fetchMaintenanceDays = () => {
    setIsLoading(true);
    fetchMachines()
      .then((machines) => {
        const maintenanceDays = machines.map((machine) => {
          const maintenanceDate = dayjs(machine.nextMaintenance).startOf("day");
          // console.log(
          //   "Maintenance Date:",
          //   maintenanceDate.format("YYYY-MM-DD"),
          // );
          return maintenanceDate;
        });

        setHighlightedDays(maintenanceDays);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching machines:", error);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchMaintenanceDays();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={dayjs().startOf("day")}
        loading={isLoading}
        onMonthChange={fetchMaintenanceDays}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{ day: ServerDay }}
        slotProps={{ day: { highlightedDays } }}
      />
    </LocalizationProvider>
  );
}
