import {Button} from "@mui/material";

import {useEffect, useState} from "react";

import {enqueueSnackbar} from "notistack";

import {useSelector} from "react-redux";

import {useAppDispatch} from "@/shared/model/hooks";
import {Game} from "@/shared/api";
import {useGiftGamesMutation} from "@/entities/game";
import {useLazyGetFriendsQuery} from "@/entities/friends";
import {openModal} from "@/entities/modal/model/slice";
import {useLazyGetUserBucketQuery} from "@/entities/bucket/api/bucketApi";

interface GiftGameButtonProps {
  games?: Game[]
  closeOnGift?: (arg: boolean) => void;
}

export const GiftGameButton = ({games, closeOnGift}: GiftGameButtonProps) => {
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [giftGames, {isLoading}] = useGiftGamesMutation();
  const [triggerFetchingFriendsList] = useLazyGetFriendsQuery();
  const [triggerBucketUpdate] = useLazyGetUserBucketQuery();
  
  const friends = useSelector((state: RootState) => state.friends.data);
  
  useEffect(() => {
    if (!games?.length || isLoading || !friends?.length) {
      setDisabled(true);
    }
  }, [games, isLoading]);
  
  const dispatch = useAppDispatch();
  
  const handleGift = async () => {
    closeOnGift?.(false);
    
    if (games?.length) {
      const {data: friends} = await triggerFetchingFriendsList();
      if (friends?.length) {
        dispatch(openModal({
          modalType: "GIFT_GAMES",
          modalProps: {
            title: "Gift Games to Friend",
            friends,
            onConfirm: async (friendId: string) => {
              const result = await giftGames({friendId, games}).unwrap();
              if (result) {
                await triggerBucketUpdate();
                enqueueSnackbar(result.message, {variant: "success"});
              }
            },
          },
        }));
      }
    }
  };
  
  return (
    <Button disabled={isDisabled} sx={{
      color: "#fff",
    }} variant="contained" onClick={handleGift}>
      {!friends?.length ? "No friends" : "Gift to friend"}
    </Button>
  );
};

