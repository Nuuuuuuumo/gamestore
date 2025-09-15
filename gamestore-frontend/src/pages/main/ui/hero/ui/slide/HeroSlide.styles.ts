import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  item: {
    display: "block",
    width: "100%",
    position: "relative",
    paddingTop: "56.25%",
    borderRadius: "var(--radius)",
    overflow: "hidden",
    backgroundColor: "var(--color-loader)",
    color: "var(--color-white)",
    "&:after": {
      content: "\"\"",
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 3,
      pointerEvents: "none",
      borderRadius: "var(--radius)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "58%",
    },
  },
  link: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  image: {
    position: "absolute",
    display: "block",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    position: "absolute",
    bottom: "30px",
    left: "30px",
    right: "30px",
    zIndex: 2,
    pointerEvents: "none",
    [theme.breakpoints.down("sm")]: {
      left: "23px",
      right: "23px",
      bottom: "23px",
    },
  },
  title: {
    "&.MuiTypography-root": {
      fontSize: "revert",
      position: "relative",
      textShadow: "0 0.75px 0 rgba(0, 0, 0, 0.2)",
      marginBottom: "15px",
    },
    [theme.breakpoints.down("sm")]: {
      "&.MuiTypography-root": {
        height: "40px",
        margin: 0,
        maxWidth: "230px",
        fontWeight: "bold",
      },
    },
  },
  bottom: {
    display: "flex",
    alignItems: "center",
  },
  rating: {
    marginRight: "15px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "12px",
    },
  },
  year: {
    display: "block",
    textShadow: "0 0.75px 0 rgba(0, 0, 0, 0.2)",
    filter: "drop-shadow(0 1px 0 rgba(0, 0, 0, 0.2)) drop-shadow(0 -1px 15px rgba(0, 0, 0, 0.12))",
    fontSize: "16px",
    marginRight: "15px",
    lineHeight: "20px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "12px",
      fontSize: "14px",
      lineHeight: "18px",
    },
  },
  genre: {
    display: "block",
    textShadow: "0 0.75px 0 rgba(0, 0, 0, 0.2)",
    filter: "drop-shadow(0 1px 0 rgba(0, 0, 0, 0.2)) drop-shadow(0 -1px 15px rgba(0, 0, 0, 0.12))",
    fontSize: "revert",
    lineHeight: "20px",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      lineHeight: "18px",
    },
  },
}));

export default useStyles;
