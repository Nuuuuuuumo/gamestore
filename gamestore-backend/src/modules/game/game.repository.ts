import { DataSource, Repository } from 'typeorm';
import { Game } from '../../entities/game.entity';
import { AddGameDto } from './dtos/addGame.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { GiftGamesDto } from './dtos/giftGames.dto';
import { QueryParamsTypes } from './types/QueryParams.types';
import { BuyGameDto } from './dtos/buyGame.dto';
import { BucketRepository } from '../bucket/bucket.repository';

@Injectable()
export class GameRepository extends Repository<Game> {
  constructor(
    dataSource: DataSource,
    private bucketRepository: BucketRepository,
  ) {
    super(Game, dataSource.createEntityManager());
  }

  public async createGame(dto: AddGameDto) {
    const game = await this.save(dto);
    await this.createQueryBuilder()
      .relation(Game, 'platforms')
      .of(game)
      .add(dto.platforms);
    await this.createQueryBuilder()
      .relation(Game, 'genres')
      .of(game)
      .add(dto.genres);

    return game;
  }

  public async buyGames(dto: BuyGameDto, user: User) {
    const { games: gameIds } = dto;

    // Find all the games
    const gamesToBuy = await this.find({
      where: gameIds.map((id) => ({ id })),
      relations: ['usersOwned'],
    });

    if (gamesToBuy.length === 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'No games found.',
        error: 'Not Found',
      });
    }

    if (gamesToBuy.length !== gameIds.length) {
      const foundIds = new Set(gamesToBuy.map((game) => game.id));
      const notFoundIds = gameIds.filter((id) => !foundIds.has(id));
      throw new NotFoundException({
        statusCode: 404,
        message: `Games not found: ${notFoundIds.join(', ')}`,
        error: 'Not Found',
      });
    }

    // Check if user already owns any of the games
    const ownedGameIds = new Set(user.games?.map((game) => game.id) || []);
    const newGames = gamesToBuy.filter((game) => !ownedGameIds.has(game.id));
    const alreadyOwnedGames = gamesToBuy.filter((game) =>
      ownedGameIds.has(game.id),
    );

    if (newGames.length === 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'You already own all selected games.',
        error: 'Bad Request',
      });
    }

    // Add the games to user's collection
    await this.createQueryBuilder()
      .relation(User, 'games')
      .of(user.id)
      .add(newGames.map((game) => game.id));

    // Clear purchased games from the user's bucket
    try {
      const userBucket = await this.bucketRepository.getUserBucket(user.id);
      if (userBucket) {
        await this.bucketRepository.removePurchasedGamesFromBucket(
          userBucket.id,
          newGames.map((game) => game.id),
        );
      }
    } catch (error) {
      // Log error but don't fail the purchase if bucket clearing fails
      console.error('Failed to clear bucket after purchase:', error);
    }

    return {
      success: true,
      message: `Successfully purchased ${newGames.length} game(s)!`,
      purchasedGames: newGames,
      alreadyOwnedGames: alreadyOwnedGames.length > 0 ? alreadyOwnedGames : [],
    };
  }

  public async giftGames(dto: GiftGamesDto, receiver: User) {
    const { friendId, games } = dto;

    if (!receiver) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Recipient not found.',
        error: 'Not Found',
      });
    }

    const ownedGameIds = new Set(receiver.games.map((game) => game.id));
    const newGames = games.filter((game) => !ownedGameIds.has(game.id));

    if (newGames.length === 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Recipient already owns all selected games.',
        error: 'Bad Request',
      });
    }

    await this.createQueryBuilder()
      .relation(User, 'games')
      .of(friendId)
      .add(newGames);

    // Clear gifted games from the sender's bucket
    try {
      // Assuming the sender's information is available - this might need to be adjusted
      // to include sender user information in the DTO or as a parameter
      const senderUserId = dto.senderId; // You'll need to add this to your DTO
      if (senderUserId) {
        const senderBucket = await this.bucketRepository.getUserBucket(
          senderUserId,
        );
        if (senderBucket) {
          await this.bucketRepository.removeGiftedGamesFromBucket(
            senderBucket.id,
            newGames.map((game) => game.id),
          );
        }
      }
    } catch (error) {
      // Log error but don't fail the gifting if bucket clearing fails
      console.error('Failed to clear bucket after gifting:', error);
    }

    return {
      success: true,
      message: `Successfully gifted ${newGames.length} game(s)!`,
    };
  }

  public async getGameWithRelations(id: string) {
    return this.findOne({
      where: { id },
      relations: ['usersOwned', 'genres', 'platforms'],
    });
  }

  public async findFilteredGames(queryParams: QueryParamsTypes) {
    const { title, rating, genres, platforms } = queryParams;
    const mappedGenres = genres.map((item) => item.toLowerCase());
    const mappedPlatforms = platforms.map((item) => item.toLowerCase());

    // Start with base query for title and rating
    let builder = this.createQueryBuilder('game')
      .leftJoinAndSelect('game.genres', 'genres')
      .leftJoinAndSelect('game.platforms', 'platforms')
      .where('game.title ILIKE :title', { title: `%${title}%` });

    // Add rating filter if provided
    if (!isNaN(+rating) && rating !== '') {
      builder.andWhere('game.rating > :rating', { rating });
    }

    // For multiple genres, we need to ensure the game has ALL selected genres
    if (
      mappedGenres.length > 0 &&
      mappedGenres.every((item) => item.trim().length)
    ) {
      // Create a subquery for each genre to check if the game has that genre
      mappedGenres.forEach((genre, index) => {
        const genreAlias = `genre${index}`;

        builder = builder.innerJoin(
          'game.genres',
          genreAlias,
          `LOWER(${genreAlias}.name) = :${genreAlias}Name`,
          { [`${genreAlias}Name`]: genre },
        );
      });
    }

    // For multiple platforms, we need to ensure the game has ALL selected platforms
    if (
      mappedPlatforms.length > 0 &&
      mappedPlatforms.every((item) => item.trim().length)
    ) {
      // Create a subquery for each platform to check if the game has that platform
      mappedPlatforms.forEach((platform, index) => {
        const platformAlias = `platform${index}`;

        builder = builder.innerJoin(
          'game.platforms',
          platformAlias,
          `LOWER(${platformAlias}.name) = :${platformAlias}Name`,
          { [`${platformAlias}Name`]: platform },
        );
      });
    }

    return builder.getMany();
  }
}
