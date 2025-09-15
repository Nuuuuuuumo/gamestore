import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

import {Friendship, User} from "@/shared/api";

type UsersListProps = {
  users?: User[];
  myFriends: User[];
  incomingRequests: Friendship[];
  outgoingRequests: Friendship[];
  onAddFriend: (user: User) => void;
  onRemoveFriend: (user: User) => void;
  onCancelRequest: (requestId: string) => void;
  onAcceptRequest: (requestId: string) => void;
  onRejectRequest: (requestId: string) => void;
  onClose?: () => void;
};

export const UsersList = ({
  users = [],
  myFriends = [],
  onAddFriend,
  onRemoveFriend,
  onAcceptRequest,
  onCancelRequest,
  incomingRequests,
  outgoingRequests,
  onRejectRequest,
  onClose,
}: UsersListProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const isFriend = (user: User) => myFriends.some((f) => f.id === user.id);
  
  return (
    <Paper
      elevation={4}
      sx={{
        position: "fixed",
        bottom: isMobile ? 0 : 20,
        right: isMobile ? 0 : 20,
        width: isMobile ? "100%" : 500,
        height: isMobile ? "50%" : "auto",
        maxHeight: isMobile ? "50%" : 500,
        overflowY: "auto",
        borderRadius: isMobile ? "16px 16px 0 0" : 3,
        p: 2,
        boxShadow: 6,
        zIndex: 1,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6">Last online users</Typography>
        {onClose && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small"/>
          </IconButton>
        )}
      </Box>
      
      {users.length > 0 ? (
        <List dense>
          {users.map((user) => {
            const incomingRequest = incomingRequests.find(
              (request) => request.userId === user.id && request.status === "pending"
            );
            const outgoingRequest = outgoingRequests.find(
              (request) => request.friendId === user.id && request.status === "pending"
            );
            return (
              <ListItem key={user.id} disableGutters>
                <ListItemAvatar>
                  <Avatar alt={user.firstName} src={user.avatarURL}/>
                </ListItemAvatar>
                <ListItemText primary={user.firstName} secondary={user.email}/>
                
                <Box display="flex" justifyContent="center" alignItems="center">
                  {isFriend(user) ? (
                    <IconButton
                      sx={{
                        marginRight: "10px",
                      }}
                      aria-label="delete"
                      onClick={() => onRemoveFriend(user)}
                    >
                      <DeleteIcon style={{color: "red"}}/>
                    </IconButton>
                  ) : incomingRequest ? (
                    <Box display="flex" gap={1}>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<CheckIcon/>}
                        sx={{
                          backgroundColor: "success.main",
                          "&:hover": {
                            backgroundColor: "success.dark",
                          },
                        }}
                        onClick={() => onAcceptRequest(incomingRequest.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<CloseIcon/>}
                        sx={{
                          backgroundColor: "error.main",
                          "&:hover": {
                            backgroundColor: "error.dark",
                          },
                        }}
                        onClick={() => onRejectRequest(incomingRequest.id)}
                      >
                        Reject
                      </Button>
                    </Box>
                  ) : outgoingRequest ? (
                    <Button size="small" onClick={() => onCancelRequest(outgoingRequest.id)}>
                      Pending
                    </Button>
                  ) : (
                    <Button size="small" onClick={() => onAddFriend(user)}>
                      Add
                    </Button>
                  )}
                </Box>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          No users found.
        </Typography>
      )}
    </Paper>
  );
};
