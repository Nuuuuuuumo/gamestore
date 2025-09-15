import {Box, Container} from "@mui/material";

import {Outlet, ScrollRestoration, useLocation} from "react-router-dom";

import type {ReactNode} from "react";

import {useStyles} from "@/shared/ui/layout/layout.styles";
import {ModalWindow} from "@/entities/modal";

type Props = {
  navbarSlot: ReactNode
  headerSlot: ReactNode
  bottomSlot: ReactNode
  sidebarSlot: ReactNode
  children: ReactNode
}

export const Layout = (props: Partial<Props>) => {
  const {classes} = useStyles();
  
  const location = useLocation();
  const maxWidth = location.pathname === "/" ? false : "xl";
  return (
    <Box className={classes.rootWrapper}>
      <ModalWindow/>
      {props.navbarSlot}
      {props.headerSlot}
      <Container key={location.pathname} maxWidth={maxWidth}
        className={classes.container}>
        {props.children ?? <Outlet/>}
      </Container>
      <ScrollRestoration/>
    </Box>
  );
};