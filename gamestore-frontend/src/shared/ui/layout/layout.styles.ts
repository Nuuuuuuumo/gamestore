import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({
  rootWrapper: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: "1 1 auto",
    maxWidth: "100%",
    width: "100%",
  },
}));