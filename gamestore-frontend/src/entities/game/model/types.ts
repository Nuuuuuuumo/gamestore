import type {Game, Genre, Platform} from "@/shared/api/models/models";

export type RequestAddGameData = {
  title: string
  price: number
  description: string
  publisher: string
  developer: string
  image: any
  multiplayerSupport: boolean
  genres: string[]
  platforms: string[]
};

export type ResponseGetGenresAndPlatforms = {
  genres: Genre[],
  platforms: Platform[]
}

export type RequestGiftGames = {
  friendId: string
  games: Game[]
}

export type ResponseGiftGames = {
  message: string
  success: boolean
}

export type ResponseBuyGames = {
  success: boolean,
  message: string
  purchasedGames: Game[],
  alreadyOwnedGames: Game[],
}

export type RequestBuyGames = {
  games: string[]
}

export type FilterState = {
  title: string
  rating: string
  genres: [],
  platforms: [],
}

