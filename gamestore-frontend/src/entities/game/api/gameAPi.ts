import type {Game} from "@/shared/api";

import {
  RequestBuyGames,
  RequestGiftGames,
  ResponseBuyGames,
  ResponseGetGenresAndPlatforms,
  ResponseGiftGames,
} from "@/entities/game/model/types";

import {baseApi} from "@/shared/api/baseAPI";
import {GAME_TAG} from "@/shared/api/tags";

export const gameApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFilteredGames: build.query<Game[], URLSearchParams>({
      query: (params) => ({
        url: "games/filteredGames",
        method: "GET",
        params,
      }),
      providesTags: [GAME_TAG],
    }),
    getGames: build.query<Game[], void>({
      query: () => ({
        url: "games",
        method: "GET",
      }),
      providesTags: [GAME_TAG],
    }),
    giftGames: build.mutation<ResponseGiftGames, RequestGiftGames>({
      query: (body) => ({
        url: "games/giftGames",
        method: "POST",
        body: body,
      }),
    }),
    buyGames: build.mutation<ResponseBuyGames, RequestBuyGames>({
      query: (body) => ({
        url: "games/buy",
        method: "POST",
        body: body,
      }),
    }),
    getGame: build.query<Game, string>({
      query: (id) => ({
        url: `games/game/${id}`,
        method: "GET",
      }),
      providesTags: [GAME_TAG],
    }),
    addGame: build.mutation<Game, FormData>({
      query: (body) => ({
        url: "games/addGame",
        method: "POST",
        body: body,
      }),
    }),
    deleteGame: build.mutation<string, string>({
      query: (id) => ({
        url: `games/game/${id}`,
        method: "DELETE",
      }),
    }),
    getGenresAndPlatforms: build.query<ResponseGetGenresAndPlatforms, void>({
      query: () => ({
        url: "games/getGenresAndPlatforms",
        method: "GET",
      }),
      providesTags: [GAME_TAG],
    }),
  }),
});

export const {
  useGetGameQuery,
  useAddGameMutation,
  useGetGenresAndPlatformsQuery,
  useGetGamesQuery,
  useBuyGamesMutation,
  useLazyGetFilteredGamesQuery,
  useDeleteGameMutation,
  useGiftGamesMutation,
} = gameApi;