import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReAuth, AUTH_TAG, GAME_TAG, FRIENDS_TAG } from "@/shared/api";

export const baseApi = createApi({
  tagTypes: [AUTH_TAG, GAME_TAG, FRIENDS_TAG],
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),

});