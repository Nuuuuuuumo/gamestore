import { Box, Divider, Typography } from "@mui/material";
import React from "react";

import { useStyles } from "./404.styles";

import { RedirectLink } from "@/shared/ui";

export const ErrorPage = () => {
  const { classes } = useStyles();
  return (
    <section className={classes.errorSection}>
      <Box className={classes.errorBox}>
        <Box className={classes.titleWrapper}>
          <Typography variant="h1">404</Typography>
          <Divider orientation="vertical" sx={{ borderWidth: 2 }} flexItem variant="middle"/>
          <Typography variant="h3">
            <Box component="div">page not</Box>
            <Box component="div">found</Box>
          </Typography>
        </Box>
        <Typography>The page you were looking for was not found. Please verify the link/URL or try starting back at our home page.</Typography>
        <RedirectLink sx={{ padding: 20, backgroundColor: "#007AF2" }} redirectTo="/">HOME PAGE</RedirectLink>
      </Box>
    </section>
  );
};

