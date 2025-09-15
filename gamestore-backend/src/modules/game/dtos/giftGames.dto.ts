import { IsArray, IsString, IsUUID } from 'class-validator';
import { Game } from '../../../entities/game.entity';

export class GiftGamesDto {
  friendId: string;

  senderId: string; // Added sender's ID to identify whose bucket to clear

  @IsArray()
  games: Game[];
}
