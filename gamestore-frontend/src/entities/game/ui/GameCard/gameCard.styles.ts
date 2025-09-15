import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  root: {
    width: "100%",
    background: "none",
    boxShadow: "none",
  },
  image: {
    display: "block",
    minHeight: "136px",
    height: "auto",
    left: "50%",
    maxWidth: "100%",
    minWidth: "100%",
    position: "relative",
    transform: "translate(-50%)",
  },
  
  price: {
    fontWeight: "bold",
  },
  title: {
    color: theme.palette.text.secondary,
    fontSize: "clamp(1rem, -0.875rem + 8.333vw, 1.5rem)",
  },
}));