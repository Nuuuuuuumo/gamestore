import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#121212",
    color: "#ffffff",
    minHeight: "100vh",
    padding: "20px",
  },
  banner: {
    width: "100%",
    height: "300px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
    marginBottom: "20px",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))",
  },
  details: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    width: "80%",
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: "20px",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  button: {
    backgroundColor: "#ff4655",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#d63e4b",
    },
    "&:disabled": {
      backgroundColor: "#333",
      cursor: "not-allowed",
    },
  },
}));