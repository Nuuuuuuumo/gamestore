import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  registrationForm: {
    display: "grid",
    gap: theme.spacing(2),
  },
}));