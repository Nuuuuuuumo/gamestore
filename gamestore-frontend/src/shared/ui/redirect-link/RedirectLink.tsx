import {Link} from "react-router-dom";

import type {SxProps, Theme} from "@mui/material";
import type {CSSProperties, ReactNode} from "react";

type RedirectLinkProps = {
  children?: ReactNode
  redirectTo: string
  sx?: SxProps<Theme> & CSSProperties
}

const styles = {
  textDecoration: "none",
  color: "inherit",
};
export const RedirectLink = ({children, redirectTo = "/", sx}: RedirectLinkProps) => (
  <Link style={{...styles, ...sx}} to={redirectTo}>
    {children}
  </Link>
);