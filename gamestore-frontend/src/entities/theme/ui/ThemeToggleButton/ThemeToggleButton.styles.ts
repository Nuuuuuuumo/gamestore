import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  root: {
    color: theme.palette.text.secondary,
  },
}));

export default useStyles;
