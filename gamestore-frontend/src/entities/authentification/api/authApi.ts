import type {RequestLoginBody, Session} from "@/entities/authentification/model/types";
import type {User} from "@/shared/api";

import {mapSession} from "@/entities/authentification/lib/mapSession";
import {baseApi} from "@/shared/api/baseAPI";
import {AUTH_TAG} from "@/shared/api/tags";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [AUTH_TAG],
      transformResponse: (response: User): Session => mapSession(response),
    }),
    registration: build.mutation<Session, FormData>({
      query: (body) => ({
        url: "auth/registration",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [AUTH_TAG],
      transformResponse: (response: User): Session => mapSession(response),
    }),
    me: build.query<Session, void>({
      query: () => ({
        url: "auth/me",
        method: "POST",
      }),
      transformResponse: (response: User) => mapSession(response),
    }),
    logout: build.mutation<{ message: string }, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    getFewUsers: build.query<User[], void>({
      query: () => ({
        url: "auth/users/few",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegistrationMutation,
  useGetFewUsersQuery,
  useLoginMutation,
  useMeQuery,
  useLazyMeQuery,
  useLogoutMutation,
} = sessionApi;