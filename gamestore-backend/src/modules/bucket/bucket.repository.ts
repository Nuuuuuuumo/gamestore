import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Bucket } from '../../entities/bucket.entity';
import { DeleteGameFromBucketDto } from './dtos/deleteGameFromBucket.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class BucketRepository extends Repository<Bucket> {
  constructor(dataSource: DataSource) {
    super(Bucket, dataSource.createEntityManager());
  }

  async getUserBucketWithGames(userId: string) {
    return this.findOne({
      where: { user: { id: userId } },
      relations: ['games'],
    });
  }

  async getUserBucket(userId: string) {
    return this.findOne({
      where: { user: { id: userId } },
    });
  }

  async createBucket(user: User) {
    const bucket = this.create({ user });
    return this.save(bucket);
  }

  async getBucketWithGames(bucketId: string) {
    return this.findOne({
      where: { id: bucketId },
      relations: ['games'],
    });
  }

  async addGameToUserBucket(dto: { gameId: string; bucketId: string }) {
    await this.createQueryBuilder()
      .relation(Bucket, 'games')
      .of(dto.bucketId)
      .add(dto.gameId);
  }

  async deleteGameFromUserBucket(dto: DeleteGameFromBucketDto) {
    await this.createQueryBuilder()
      .relation(Bucket, 'games')
      .of(dto.bucketId)
      .remove(dto.gameId);
  }

  calculateTotalPrice(games: { price: number }[]): number {
    return games.reduce((acc, game) => acc + +game.price, 0);
  }

  public async clearUserBucket(bucketId: string) {
    // Remove the relationship between the bucket and its games without deleting the actual games
    const bucket = await this.createQueryBuilder('bucket')
      .leftJoinAndSelect('bucket.games', 'game')
      .where('bucket.id = :bucketId', { bucketId })
      .getOne();

    if (!bucket) {
      throw new Error('Bucket not found');
    }

    // Clear the games relation by setting the array to empty
    bucket.games = [];

    // Save the updated bucket
    await this.save(bucket);
  }

  /**
   * Removes purchased games from user's bucket
   * @param bucketId The user's bucket ID
   * @param gameIds IDs of games that were purchased
   */
  public async removePurchasedGamesFromBucket(
    bucketId: string,
    gameIds: string[],
  ) {
    const bucket = await this.getBucketWithGames(bucketId);

    if (!bucket) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Bucket not found.',
        error: 'Not Found',
      });
    }

    if (bucket.games && bucket.games.length > 0) {
      // Filter out games that were purchased
      const gameIdsSet = new Set(gameIds);
      const remainingGames = bucket.games.filter(
        (game) => !gameIdsSet.has(game.id),
      );

      // Update the bucket with only the remaining games
      bucket.games = remainingGames;
      await this.save(bucket);
    }

    return {
      success: true,
      message: `Removed ${gameIds.length} purchased game(s) from bucket.`,
    };
  }

  /**
   * Removes gifted games from user's bucket
   * @param bucketId The user's bucket ID
   * @param gameIds IDs of games that were gifted
   */
  public async removeGiftedGamesFromBucket(
    bucketId: string,
    gameIds: string[],
  ) {
    return this.removePurchasedGamesFromBucket(bucketId, gameIds);
  }
}
