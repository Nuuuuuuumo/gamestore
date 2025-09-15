import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";

import { selectUserData } from "@/entities/authentification";
import { useAppSelector } from "@/shared/model/hooks";
import {FriendsList} from "@/entities/friends/ui/FriendsList/FriendsList";
import {useGetFriendsQuery} from "@/entities/friends";

export const ProfilePage = () => {
  const profileData = useAppSelector(selectUserData);
  const { data: friends, isFetching, refetch } = useGetFriendsQuery();
  if (!profileData) return <div>Something went wrong. Please update page</div>;
  
  return (
    <Container maxWidth="md" style={{ marginTop: 40 }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Avatar
              alt={`${profileData.firstName} ${profileData.lastName}`}
              src={profileData.avatarURL}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {`${profileData.firstName} ${profileData.lastName}`}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Email: {profileData.email}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Member Since: {new Date(profileData.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <FriendsList refetch={refetch} friends={friends} isFetching={isFetching} />
    </Container>
  );
};
