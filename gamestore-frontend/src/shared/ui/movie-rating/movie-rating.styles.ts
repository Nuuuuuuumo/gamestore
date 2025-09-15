import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  rating: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    fontWeight: "bold",
    backgroundColor: "rgba(229, 229, 229, 0.32)",
    borderRadius: "5px",
  },
  small: {
    fontSize: "12px",
    lineHeight: "19px",
    padding: "0 5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
      lineHeight: "19px",
      padding: "0 4px",
    },
  },
  medium: {
    fontSize: "15px",
    lineHeight: "24px",
    padding: "0 10px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      lineHeight: "23px",
      padding: "0 4px",
    },
  },
  isHighRating: {
    backgroundColor: "#12b77c",
  },
}));