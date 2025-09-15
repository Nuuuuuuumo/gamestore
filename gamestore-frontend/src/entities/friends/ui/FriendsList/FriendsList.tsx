import {
  CircularProgress,
  List,
  ListItem,
  Typography,
  Paper,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";

import {enqueueSnackbar} from "notistack";

import {User} from "@/shared/api";
import {useDeleteFromFriendsMutation} from "@/entities/friends/api/friendsAPI";

type FriendsListProps = {
  friends: User[]
  isFetching: boolean
  refetch?: () => void
}

export const FriendsList = ({ friends, isFetching, refetch }: Partial<FriendsListProps>) => {
  const [deleteFromFriends] = useDeleteFromFriendsMutation();
  const [loadingFriendId, setLoadingFriendId] = useState<string | null>(null);
  if (isFetching) return <CircularProgress/>;
  
  const handleDeleteFromFriends = async (id: string) => {
    setLoadingFriendId(id);
    await deleteFromFriends(id)
      .unwrap()
      .then(() => {
        enqueueSnackbar("Friend successfully deleted.", { variant: "success" });
        refetch?.();
      })
      .catch((e) => {
        enqueueSnackbar(e.data, { variant: "error" });
      }).finally(() => {
        setLoadingFriendId(null);
      });
  };
  return (
    <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h5" gutterBottom>
        Friends List
      </Typography>
      {friends && friends.length > 0 ? (
        <List>
          {friends.map((friend) => (
            <ListItem key={friend.id}>
              <ListItemAvatar>
                <Avatar alt={friend.firstName} src={friend.avatarURL} />
              </ListItemAvatar>
              <ListItemText primary={friend.firstName} secondary={friend.email} />
              <IconButton edge="end" aria-label="delete"  onClick={() => handleDeleteFromFriends(friend.id)}
                disabled={loadingFriendId === friend.id}
              >
                {loadingFriendId === friend.id ? (
                  <CircularProgress size={24} />
                ) : (
                  <DeleteIcon style={{ color: "red" }} />
                )}
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No friends yet.
        </Typography>
      )}
    </Paper>
  );
}
;
