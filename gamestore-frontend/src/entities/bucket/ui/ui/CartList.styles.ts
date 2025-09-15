import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()(() => ({
  cartListWrapper: {
    width: "100%",
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 2,
  },
  listContainer: {
    flex: "1 1 auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    maxHeight: "100%",
    overflow: "hidden",
  },
  gamesList: {
    overflowY: "auto",
    flex: 1,
    padding: 0,
  },
  listItem: {
    borderRadius: 1,
    margin: "8px 0",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.05)",
    },
  },
  gameImage: {
    borderRadius: 1,
    width: 60,
    height: 60,
    objectFit: "cover",
  },
  deleteButton: {
    color: "#ff5252",
    margin: 0,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(255,82,82,0.1)",
    },
  },
  summarySection: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 1,
    padding: "16px",
    marginTop: 2,
  },
  checkoutButton: {
    backgroundColor: "#333",
    color: "#fff",
    marginTop: 2,
    padding: "10px 16px",
    "&:hover": {
      backgroundColor: "#444",
    },
    textTransform: "none",
  },
}));

export default useStyles;
