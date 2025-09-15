import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {enqueueSnackbar} from "notistack";

import {Game} from "@/shared/api";
import {useBuyGamesMutation} from "@/entities/game/api/gameAPi";
import {useLazyGetUserBucketQuery} from "@/entities/bucket/api/bucketApi";

interface GiftGameButtonProps {
  games?: Game[]
  closeOnBuy?: (arg: boolean) => void;
}

export const BuyGamesButton = ({games, closeOnBuy}: GiftGameButtonProps) => {
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [buyGames, {isLoading}] = useBuyGamesMutation();
  const [triggerBucketUpdate] = useLazyGetUserBucketQuery();
  
  useEffect(() => {
    if (!games?.length || isLoading) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [games, isLoading]);
  
  const handleBuy = async () => {
    try {
      const gameIds = games?.map(game => game.id) || [];
      
      const requestPayload = {
        games: gameIds,
      };
      
      const result = await buyGames(requestPayload).unwrap();
      
      if (result) {
        enqueueSnackbar(result.message, {variant: "success"});
        await triggerBucketUpdate();
        closeOnBuy?.(false);
      }
    } catch (error) {
      enqueueSnackbar("Failed to purchase games", {variant: "error"});
    }
  };
  
  return (
    <Button
      disabled={isDisabled}
      sx={{
        color: "#fff",
      }}
      variant="contained"
      onClick={handleBuy}
    >
      Buy games
    </Button>
  );
};