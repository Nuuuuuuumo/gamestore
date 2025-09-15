import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({
  container: {
    display: "flex",
    maxWidth: 1500,
    flexWrap: "wrap",
    margin: "0 auto",
    width: "75%",
  },
}));