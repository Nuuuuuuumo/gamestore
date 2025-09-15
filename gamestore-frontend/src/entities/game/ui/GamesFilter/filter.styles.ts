import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({
  root: {
    gap: 10,
    display: "flex",
    flexDirection: "column",
    maxWidth: 250,
    width: "100%",
    padding: 10,
  },
}));