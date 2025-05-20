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
import useThemeStore from "../store/useThemeStore";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === "dark";

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

  const isDayPassed = day.isBefore(today, "day");

  return (
    <Tooltip title={tooltipMessage} arrow>
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isSelected && !isDayPassed ? "•" : undefined}
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
          sx={{
            color: isDarkMode
              ? outsideCurrentMonth
                ? "rgba(255,255,255,0.6)"
                : "white"
              : "black",
          }}
        />
      </Badge>
    </Tooltip>
  );
}

export default function DateCalendarComponent({ cusWidth }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === "dark";

  const fetchMaintenanceDays = () => {
    setIsLoading(true);
    fetchMachines()
      .then((data) => {
        if (Array.isArray(data.machines)) {
          const maintenanceDays = data.machines.map((machine) =>
            dayjs(machine.nextMaintenanceDateTime).startOf("day"),
          );
          setHighlightedDays(maintenanceDays);
        } else {
          console.error(
            "Fetched data.machines is not an array:",
            data.machines,
          );
        }
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

  const customTheme = createTheme({
    components: {
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            color: isDarkMode ? "white" : "black",
          },
        },
      },
      MuiDayCalendar: {
        styleOverrides: {
          weekDayLabel: {
            color: isDarkMode ? "white" : "black",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDarkMode ? "white" : "black",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={dayjs().startOf("day")}
          loading={isLoading}
          onMonthChange={fetchMaintenanceDays}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{ day: ServerDay }}
          slotProps={{ day: { highlightedDays } }}
          // sx={{
          //   width: cusWidth || { xs: 180, sm: 280, md: 100, lg: 200, xl: 300 },
          //   height: { xs: 240, sm: 10, md: 10, lg: 250, xl: 320 },
          //   fontSize: "1rem",
          //   // "& .MuiCalendar-root": {
          //   //   // shorthand for both rowGap and columnGap:
          //   //   // gap: (theme) => theme.spacing(10, 5.5),
          //   //   // OR separately:
          //   //   rowGap: (theme) => theme.spacing(10),
          //   //   // columnGap: (theme) => theme.spacing(1.5),
          //   // },

          //   "& .MuiPickersCalendarHeader-root, & .MuiDayCalendar-weekDayLabel":
          //     {
          //       fontSize: "0.875rem",
          //       marginBottom: 1,
          //     },

          //   "& .MuiDayCalendar-root": {
          //     // width: 400,
          //     // height: 100,
          //     // margin: 1,
          //     // marginBottom: "100px",
          //     // paddingBottom: "100px",
          //     fontSize: "1.875rem",
          //   },

          //   // "& .MuiIconButton-root": {
          //   //   fontSize: "1.5rem",
          //   // },

          //   color: isDarkMode ? "white" : "black",
          // }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
