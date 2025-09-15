import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));