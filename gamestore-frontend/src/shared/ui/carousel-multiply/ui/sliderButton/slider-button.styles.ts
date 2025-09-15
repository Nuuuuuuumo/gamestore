import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "70px",
    borderRadius: "8px",
    transition: "opacity 0.3s, visibility 0.3s",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "&:hover": {
      "&:before": {
        background: `radial-gradient(100% 100% at 100% 0, ${theme.palette.grey[200]} 0, ${theme.palette.grey[300]} 100%)`,
        transform: "scale(1.2) translateZ(0)",
      },
    },
    "& svg": {
      display: "block",
      width: "30px",
      height: "30px",
      fill: theme.palette.common.white,
    },
    "&:before": {
      content: "\"\"",
      position: "absolute",
      WebkitBackdropFilter: "blur(13px)",
      backdropFilter: "blur(13px)",
      background: `rgba(${theme.palette.grey[300]}, 0.32)`,
      zIndex: -1,
      top: "0",
      bottom: "0",
      right: "0",
      left: "0",
      border: "none",
      borderRadius: "8px",
      transition: "transform 0.1s",
    },
  },
}));

export default useStyles;
