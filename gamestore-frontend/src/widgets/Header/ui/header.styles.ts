import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  appBar: {
    backgroundColor: "#141414", // Dark header in both themes
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    borderRadius: "0 0 16px 16px", // Rounded bottom borders
    position: "relative",
    zIndex: theme.zIndex.appBar,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    minHeight: "80px",
  },
  iconButton: {
    color: "#fff",
  },
  navLinks: {
    display: "flex",
    gap: "24px",
    marginLeft: "24px",
    "& a": {
      color: "#fff",
      textDecoration: "none",
      fontWeight: 500,
      fontSize: "16px",
      transition: "color 0.2s ease",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
  authButtons: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    "& a": {
      color: "#fff",
      textDecoration: "none",
      fontWeight: 500,
      fontSize: "16px",
      transition: "color 0.2s ease",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
  searchingField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.12)",
      },
      "&.Mui-focused": {
        backgroundColor: "rgba(255, 255, 255, 0.16)",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.main,
          borderWidth: 1,
        },
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "& .MuiOutlinedInput-input": {
      color: "#fff",
      "&::placeholder": {
        color: "rgba(255, 255, 255, 0.5)",
        opacity: 1,
      },
    },
    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: "rgba(255, 255, 255, 0.7)",
    },
  },
}));