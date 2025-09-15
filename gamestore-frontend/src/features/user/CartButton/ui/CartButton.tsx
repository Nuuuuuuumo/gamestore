import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Badge, Box, Button, Divider, Drawer, Slide, Tooltip, Typography} from "@mui/material";
import React, {useState} from "react";

import useStyles from "./CartButton.styles";

import {useGetUserBucketQuery} from "@/entities/bucket/api/bucketApi";
import {selectUserBucket} from "@/entities/bucket/model/slice";
import {CartList} from "@/entities/bucket/ui/ui/CartList";
import {useAppSelector} from "@/shared/model/hooks";
import {GiftGameButton} from "@/features/game/giftGameButton";
import {BuyGamesButton} from "@/features/game/buyGames/ui/BuyGamesButton";

export const CartButton = () => {
  const {classes} = useStyles();
  const userBucket = useAppSelector(selectUserBucket);
  const {isLoading, error} = useGetUserBucketQuery();
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const gameCount = userBucket?.games?.length || 0;
  
  return (
    <>
      <Tooltip title="Open Cart">
        <Button
          sx={{
            color: "#6c6c6c",
            position: "relative",
          }}
          onClick={handleOpen}
        >
          <Badge
            badgeContent={gameCount}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <ShoppingCartIcon/>
          </Badge>
        </Button>
      </Tooltip>
      
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={open}
        onClose={handleClose}
        transitionDuration={300}
      >
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
          <Box
            style={{
              width: 400,
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Button
                style={{
                  fontSize: "16px",
                  gap: 20,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleClose}
              >
                <Typography sx={{marginTop: "3px"}}>
                  Continue shopping
                </Typography>
                <ArrowForwardIosIcon/>
              </Button>
              <Divider/>
            </Box>
            <CartList close={setOpen} isLoading={isLoading} bucket={userBucket} error={error}/>
            <Box style={{display: "flex", justifyContent: "space-around", marginBottom: "10px"}}>
              <GiftGameButton closeOnGift={setOpen} games={userBucket?.games}/>
              <BuyGamesButton closeOnBuy={setOpen} games={userBucket?.games}/>
            </Box>
          </Box>
        </Slide>
      </Drawer>
    </>
  );
};
