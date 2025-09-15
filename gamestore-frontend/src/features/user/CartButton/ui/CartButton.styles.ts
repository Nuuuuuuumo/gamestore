import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()(() => ({
  drawer: {
    zIndex: 9999,
    "& .MuiPaper-root": {
      overflow: "hidden",
    },
  },
}));

export default useStyles;
