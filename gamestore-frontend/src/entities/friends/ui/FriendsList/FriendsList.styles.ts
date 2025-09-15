import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  list: {
    alignItems: "flex-start",
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "32px",
    overflow: "hidden",
    width: "calc(100% + 16px)",
  },
  item: {
    [theme.breakpoints.between(1920, 4000)]: {
      width: "calc(20% - 16px * 0.8)",
    },

    [theme.breakpoints.between(1440, 1920)]: {
      width: "calc(25% - 16px * 0.8)",
    },
    [theme.breakpoints.between(1024, 1440)]: {
      width: "calc(33% - 16px * 0.8)",
    },
    padding: 0,
    height: "auto",
  },
}));