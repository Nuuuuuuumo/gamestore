import {createSlice} from "@reduxjs/toolkit";

import {sessionApi} from "@/entities/authentification/api/authApi";
import {type Session} from "@/entities/authentification/model/types";

type SessionSliceState =
  | {
  data: Session
  isAuthorized: true
}
  | {
  isAuthorized: false
  data?: Session
}

const initialState: SessionSliceState = {
  isAuthorized: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    clearSessionData: (state) => {
      state.isAuthorized = false;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(sessionApi.endpoints.me.matchFulfilled, (state: SessionSliceState, {payload}) => {
      state.isAuthorized = Boolean(payload);
      if (state.isAuthorized) {
        state.data = payload;
      }
    });
    builder.addMatcher(sessionApi.endpoints.login.matchFulfilled, (state: SessionSliceState, {payload}) => {
      state.isAuthorized = Boolean(payload);
      if (state.isAuthorized) {
        state.data = payload;
      }
    });
  },
});

export const selectUserData = (state: RootState) => {
  return state.session?.data;
};

export const selectIsAuth = (state: RootState) => {
  return state.session?.isAuthorized;
};

export const {clearSessionData} = sessionSlice.actions;