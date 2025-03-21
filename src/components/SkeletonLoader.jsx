import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import useThemeStore from "../store/useThemeStore";

export default function SkeletonLoader({
  hideAvatar = false,
  hideTitle = false,
  hideSubheader = false,
  hideContent = false,
  hideRect = false,
}) {
  const { theme } = useThemeStore();

  const themeMode = createTheme({
    palette: {
      mode: theme === "dark" ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={themeMode}>
      <Card
        sx={{
          borderRadius: "5px",
          backgroundColor: theme === "dark" ? "#171717" : "white",
          transition: "background-color 0.3s ease",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          paddingY: "1px",
          // alignItems: "start",
          justifyContent: "center",
          overflow: "hidden",
          // paddingY: "1px",
        }}
        elevation={0}
      >
        <CardHeader
          avatar={
            !hideAvatar && (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
                // paddingY: "1px"
              />
            )
          }
          title={
            !hideTitle && (
              <Skeleton
                animation="wave"
                height={10}
                width="100%"
                style={{ marginBottom: 6 }}
              />
            )
          }
          subheader={
            !hideSubheader && (
              <Skeleton animation="wave" height={10} width="60%" />
            )
          }
        />
        {!hideRect && (
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{
              flexGrow: 1,
              width: "100%",
              height: "100%",
              marginBottom: "10px",
            }}
          />
        )}
        {!hideContent && (
          <CardContent
            sx={{
              flexGrow: 1,
              width: "100%",
              paddingY: "0px",
            }}
          >
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </CardContent>
        )}
      </Card>
    </ThemeProvider>
  );
}
