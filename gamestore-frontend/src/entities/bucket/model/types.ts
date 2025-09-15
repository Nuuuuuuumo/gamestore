import type { Game } from "@/shared/api";

export type Bucket = {
  id: string
  games?: Game[]
  totalPrice: number
};

export type DeleteGameFromBucketDto = {
  gameId: string;
  bucketId: string;

}