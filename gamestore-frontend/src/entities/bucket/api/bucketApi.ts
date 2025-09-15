import type {Bucket, DeleteGameFromBucketDto} from "@/entities/bucket/model/types";

import {baseApi} from "@/shared/api/baseAPI";

export const bucketApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserBucket: build.query<Bucket, void>({
      query: () => ({
        url: "bucket/getBucket",
        method: "GET",
      }),
    }),
    addGameToBucket: build.mutation<Bucket, string>({
      query: (gameId) => ({
        url: "bucket/addGameToBucket",
        method: "POST",
        body: {gameId},
      }),
    }),
    clearBucket: build.query<Bucket, void>({
      query: () => ({
        url: "bucket/clearBucket",
        method: "POST",
      }),
    }),
    deleteGameFromBucket: build.mutation<Bucket, DeleteGameFromBucketDto>({
      query: (body) => ({
        url: "bucket/deleteGameFromBucket",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserBucketQuery,
  useLazyGetUserBucketQuery,
  useAddGameToBucketMutation,
  useDeleteGameFromBucketMutation,
  useLazyClearBucketQuery,
} = bucketApi;