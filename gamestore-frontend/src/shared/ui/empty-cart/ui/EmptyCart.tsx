import React from "react";
import {Box, Button, Typography} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

type EmptyCartProps = {
  close: (arg: boolean) => void;
}

export const EmptyCart = ({close}: EmptyCartProps) => {
  const navigate = useNavigate();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const bgColor = mode === "dark" ? "#8B5CF6" : "#141414";
  
  return (
    <Box
      sx={{
        flex: "1 1 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: 3,
        textAlign: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
          padding: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <ShoppingCartOutlinedIcon
          sx={{
            fontSize: 60,
            color: "rgba(255,255,255,0.7)",
          }}
        />
      </Box>
      <Typography variant="h6" sx={{fontWeight: 500, marginBottom: 1}}>
        Your wishlist is empty
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{maxWidth: 300, mb: 3}}>
        Add some games to your wishlist to keep track of titles you're interested in
      </Typography>
      <Button
        variant="contained"
        endIcon={<ArrowForwardIcon/>}
        sx={{
          backgroundColor: bgColor,
          color: "#fff",
          "&:hover": {
            backgroundColor: "#8375A2FF",
          },
          textTransform: "none",
          borderRadius: 1.5,
          padding: "8px 24px",
        }}
        onClick={() => {
          navigate("/games");
          close(false);
        }}>
        Continue shopping
      </Button>
    </Box>
  );
};