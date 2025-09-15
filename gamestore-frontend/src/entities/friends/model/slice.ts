import { createSlice } from "@reduxjs/toolkit";

import {User} from "@/shared/api";
import {friendsAPI} from "@/entities/friends/api/friendsAPI";

type FriendsSliceState = {
  data: null | User[],
};

const initialState: FriendsSliceState = {
  data: null,
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    clearFriendsData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(friendsAPI.endpoints.getFriends.matchFulfilled, (state: FriendsSliceState, { payload }) => {
      state.data = payload;
    });
  },
});

export const selectFriends = (state: RootState) => state.friends.data;

export const { clearFriendsData } = friendsSlice.actions;