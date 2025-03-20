import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import useThemeStore from "../store/useThemeStore";

export default function SkeletonLoader({ num_h, num_w }) {
  const { theme } = useThemeStore();

  const themeMode = createTheme({
    palette: {
      mode: theme === "dark" ? "dark" : "light",
    },
  });

  return (
    <div>
      <ThemeProvider theme={themeMode}>
        <Card
          sx={{
            height: num_h ? `${num_h}vh` : "auto",
            width: num_w ? `${num_w}vw` : "auto",
            borderRadius: "5px",
            backgroundColor: theme === "dark" ? "#171717" : "white",
            transition: "background-color 0.3s ease",
          }}
          elevation={0}
        >
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
                sx={{
                  transition: "background-color 0.3s ease", // Transition for background color change
                }}
              />
            }
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
                sx={{
                  transition: "background-color 0.3s ease", // Transition for background color change
                }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          <Skeleton
            sx={{
              height: 110,

              transition: "background-color 0.3s ease", // Transition for background color change
            }}
            animation="wave"
            variant="rectangular"
          />
          <CardContent>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
              sx={{
                transition: "background-color 0.3s ease", // Transition for background color change
              }}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              sx={{
                transition: "background-color 0.3s ease", // Transition for background color change
              }}
            />
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
}
