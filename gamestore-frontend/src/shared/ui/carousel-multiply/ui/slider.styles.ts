import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => ({
  slider: {
    position: "static",
  },
  prev: {
    position: "absolute",
    top: "50%",
    left: "30px",
    zIndex: 2,
    transform: "translateY(-50%)",
  },
  next: {
    position: "absolute",
    top: "50%",
    right: "30px",
    left: "auto",
    zIndex: 2,
    transform: "translateY(-50%)",

  },
}));

export default useStyles;
