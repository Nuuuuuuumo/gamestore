import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({
  rootWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    maxWidth: "400px",
    width: "100%",
    transform: "translate(-50%, -50%)",
  },
}));