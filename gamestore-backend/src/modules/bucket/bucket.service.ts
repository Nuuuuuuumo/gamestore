import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Game } from '../../entities/game.entity';
import { BucketRepository } from './bucket.repository';
import { DeleteGameFromBucketDto } from './dtos/deleteGameFromBucket.dto';

@Injectable()
export class BucketService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    private readonly bucketRepository: BucketRepository,
  ) {}

  async getBucket(req: Request, res: Response) {
    const userId = req.user['id'];
    const bucket = await this.bucketRepository.getUserBucketWithGames(userId);

    if (!bucket) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Bucket for user ${userId} not found` });
    }

    bucket.totalPrice = this.bucketRepository.calculateTotalPrice(bucket.games);
    return res.status(HttpStatus.OK).send(bucket);
  }

  async deleteGameFromBucket(dto: DeleteGameFromBucketDto, res: Response) {
    await this.bucketRepository.deleteGameFromUserBucket(dto);
    const bucket = await this.bucketRepository.getBucketWithGames(dto.bucketId);
    bucket.totalPrice = this.bucketRepository.calculateTotalPrice(bucket.games);

    return res.status(HttpStatus.OK).send(bucket);
  }

  async addGameToBucket(gameId: string, req: Request, res: Response) {
    const userId = req.user['id'];
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `User ${userId} not found` });
    }

    let bucket = await this.bucketRepository.getUserBucket(userId);
    if (!bucket) {
      bucket = await this.bucketRepository.createBucket(user);
    }

    const game = await this.gameRepository.findOne({ where: { id: gameId } });
    if (!game) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: `Game ${gameId} not found` });
    }

    await this.bucketRepository.addGameToUserBucket({
      bucketId: bucket.id,
      gameId,
    });

    bucket = await this.bucketRepository.getBucketWithGames(bucket.id);
    bucket.totalPrice = this.bucketRepository.calculateTotalPrice(bucket.games);

    return res.status(HttpStatus.OK).send(bucket);
  }

  async clearBucket(req: Request, res: Response) {
    const userId = req.user['id'];
    const bucket = await this.bucketRepository.getUserBucket(userId);

    if (!bucket) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Bucket for user ${userId} not found` });
    }

    await this.bucketRepository.clearUserBucket(bucket.id);

    return res
      .status(HttpStatus.OK)
      .send({ message: `Bucket for user ${userId} has been cleared`, bucket });
  }
}
