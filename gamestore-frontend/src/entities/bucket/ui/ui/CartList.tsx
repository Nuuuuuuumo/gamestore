import React from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {enqueueSnackbar} from "notistack";

import useStyles from "./CartList.styles";

import {EmptyCart} from "@/shared/ui/empty-cart";
import {Loader} from "@/shared/ui/loader/Loader";
import {useDeleteGameFromBucketMutation} from "@/entities/bucket/api/bucketApi";
import {Bucket} from "@/entities/bucket/model/types";

interface CartListProps {
  isLoading: boolean;
  bucket: Bucket | null;
  error: any;
  close: (arg: boolean) => void;
}

export const CartList = ({close, isLoading, bucket, error}: CartListProps) => {
  const {classes} = useStyles();
  const isError = Boolean(error);
  const [deleteGameFromBucket, {isLoading: isGameDeleting}] = useDeleteGameFromBucketMutation();
  
  const handleDeleteGameFromBucket = async (gameId: string) => {
    if (bucket) {
      await deleteGameFromBucket({gameId, bucketId: bucket.id})
        .unwrap()
        .then(() => {
          if (isGameDeleting) {
            enqueueSnackbar("Game successfully removed from wishlist", {
              variant: "success",
              autoHideDuration: 3000,
            });
          }
        })
        .catch(() => {
          enqueueSnackbar("Failed to remove game from wishlist", {
            variant: "error",
            autoHideDuration: 3000,
          });
        });
    }
  };
  
  const games = bucket?.games ?? [];
  const hasGames = games.length > 0;
  
  if (isLoading) {
    return (
      <Box className={classes.cartListWrapper}>
        <Loader/>
      </Box>
    );
  }
  
  if (isError) {
    return (
      <Box className={classes.cartListWrapper}>
        <Typography variant="body1" color="error">
          Something went wrong loading your wishlist...
        </Typography>
        <Button
          variant="outlined"
          sx={{mt: 2, textTransform: "none"}}
          onClick={() => window.location.reload()}
        >
          Try again
        </Button>
      </Box>
    );
  }
  
  if (!bucket || !hasGames) {
    return <EmptyCart close={close}/>;
  }
  
  return (
    <Box className={classes.listContainer}>
      <Box className={classes.gamesList}>
        <Typography variant="h6" sx={{px: 2, pt: 2, pb: 1}}>
          Your Wishlist ({games.length} {games.length === 1 ? "game" : "games"})
        </Typography>
        <List disablePadding sx={{px: 2}}>
          {games.map((game) => (
            <Paper
              key={game.id}
              elevation={0}
              className={classes.listItem}
            >
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    alt={game.title}
                    src={game.imageUrl}
                    className={classes.gameImage}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    marginLeft: "5px",
                  }}
                  primary={
                    <Typography variant="body1" fontWeight={500}>
                      {game.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      ${game.price}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Remove from wishlist">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      className={classes.deleteButton}
                      onClick={() => handleDeleteGameFromBucket(game.id)}
                      disabled={isGameDeleting}
                    >
                      <DeleteOutlineIcon/>
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>
      </Box>
      
      <Box sx={{px: 2, pb: 2}}>
        <Paper elevation={0} className={classes.summarySection}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}>
            <Typography variant="body1" fontWeight={500}>
              Total
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              ${bucket?.totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};