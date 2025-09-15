import {baseApi} from "@/shared/api/baseAPI";
import {FRIENDS_TAG, Friendship, GAME_TAG, User} from "@/shared/api";

export const friendsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFriends: build.query<User[], void>({
      query: () => ({
        url: "friends/list",
        method: "GET",
      }),
      providesTags: [GAME_TAG],
    }),
    
    getIncomingRequests: build.query<Friendship[], void>({
      query: () => ({
        url: "friends/incoming-requests",
        method: "GET",
      }),
      providesTags: [FRIENDS_TAG],
    }),
    getOutgoingRequests: build.query<Friendship[], void>({
      query: () => ({
        url: "friends/outgoing-requests",
        method: "GET",
      }),
      providesTags: [FRIENDS_TAG],
    }),
    
    deleteFromFriends: build.mutation<string, string>({
      query: (id) => ({
        url: `friends/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [GAME_TAG],
    }),
    
    getFriendRequests: build.query<User[], void>({
      query: () => ({
        url: "friends/requests",
        method: "GET",
      }),
      providesTags: [FRIENDS_TAG],
    }),
    
    sendFriendRequest: build.mutation<void, string>({
      query: (id) => ({
        url: `friends/request/${id}`,
        method: "POST",
      }),
      invalidatesTags: [FRIENDS_TAG, GAME_TAG],
    }),
    
    cancelFriendRequest: build.mutation<void, string>({
      query: (id) => ({
        url: `friends/cancel/${id}`,
        method: "POST",
      }),
      invalidatesTags: [FRIENDS_TAG],
    }),
    acceptFriendRequest: build.mutation<void, string>({
      query: (id) => ({
        url: `friends/accept/${id}`,
        method: "POST",
      }),
      invalidatesTags: [FRIENDS_TAG, GAME_TAG],
    }),
    rejectFriendRequest: build.mutation<void, string>({
      query: (id) => ({
        url: `friends/reject/${id}`,
        method: "POST",
      }),
      invalidatesTags: [FRIENDS_TAG, GAME_TAG],
    }),
    
  }),
});

export const {
  useGetFriendsQuery,
  useLazyGetFriendsQuery,
  useDeleteFromFriendsMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useSendFriendRequestMutation,
  useGetOutgoingRequestsQuery,
  useGetIncomingRequestsQuery,
  useCancelFriendRequestMutation,
} = friendsAPI;
