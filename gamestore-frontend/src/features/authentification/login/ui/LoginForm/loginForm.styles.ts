import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  loginForm: {
    display: "grid",
    gap: theme.spacing(2),
  },
}));