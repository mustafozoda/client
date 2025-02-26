import React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import CardMedia from "@mui/material/CardMedia";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SkeletonLoader() {
  return (
    <div className="w-[290px]">
      <ThemeProvider theme={darkTheme} style={{}}>
        <Card sx={{ maxWidth: 300, m: 2 }}>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            }
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          <Skeleton
            sx={{ height: 150 }}
            animation="wave"
            variant="rectangular"
          />
          <CardContent animation="wave">
            <React.Fragment animation="wave">
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
}
