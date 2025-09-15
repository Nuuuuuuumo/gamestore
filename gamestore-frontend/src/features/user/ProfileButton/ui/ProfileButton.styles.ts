import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()(() => ({
  menu: {
    "& .MuiMenu-list": {
      color: "white",
      gap: "5px",
      "& .MuiMenuItem-root": {
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: "#1B1B1B",
        },
      },
    },
  },
  paper: {
    background: "rgba(2,1,1,0.5)",
    borderRadius: "5px",
    border: "1px solid #4242427F",
    backdropFilter: "blur(3px)",
    marginTop: 45,
    padding: "0px 5px",
  },
}));

