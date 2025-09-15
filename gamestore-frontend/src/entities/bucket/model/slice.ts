import {createSlice} from "@reduxjs/toolkit";

import type {Bucket} from "@/entities/bucket/model/types";

import {bucketApi} from "@/entities/bucket/api/bucketApi";

type BucketSliceState = {
  data: null | Bucket,
};

const initialState: BucketSliceState = {
  data: null,
};

export const bucketSlice = createSlice({
  name: "bucket",
  initialState,
  reducers: {
    clearBucketData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(bucketApi.endpoints.getUserBucket.matchFulfilled, (state: BucketSliceState, {payload}) => {
      state.data = payload;
    });
    builder.addMatcher(bucketApi.endpoints.addGameToBucket.matchFulfilled, (state: BucketSliceState, {payload}) => {
      state.data = payload;
    });
    builder.addMatcher(bucketApi.endpoints.deleteGameFromBucket.matchFulfilled, (state: BucketSliceState, {payload}) => {
      state.data = payload;
    });
    builder.addMatcher(bucketApi.endpoints.clearBucket.matchFulfilled, (state: BucketSliceState, {payload}) => {
      state.data = payload;
    });
  },
});

export const selectUserBucket = (state: RootState) => state.bucket.data;
export const selectUserBucketGames = (state: RootState) => state.bucket.data?.games;

export const {clearBucketData} = bucketSlice.actions;