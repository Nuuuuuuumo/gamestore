import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({
  errorSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textTransform: "uppercase",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    maxWidth: 500,
    gap: 15,
  },
}));