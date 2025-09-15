import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AddGameDto } from './dtos/addGame.dto';
import { GiftGamesDto } from './dtos/giftGames.dto';
import { QueryParamsTypes } from './types/QueryParams.types';
import { AwsService } from '../aws/aws.service';
import { GameRepository } from './game.repository';
import { Genre } from '../../entities/genre.entity';
import { Platform } from '../../entities/platform.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlainFromExist } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { BuyGameDto } from './dtos/buyGame.dto';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(AwsService)
    private readonly awsService: AwsService,
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
  ) {}

  async addGame(res: Response, dto: AddGameDto, image?: Express.Multer.File) {
    const s3Response = await this.awsService.uploadImage(image);
    const game = await this.gameRepository.createGame({
      ...dto,
      imageUrl: s3Response,
    });
    return res.status(HttpStatus.OK).send(game);
  }

  async deleteGame(id: string, res: Response) {
    await this.gameRepository.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'Successfully deleted' });
  }

  async buyGames(dto: BuyGameDto, userId: string) {
    // Find user with their owned games
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['games'],
    });

    // Perform the purchase
    const result = await this.gameRepository.buyGames(dto, user);

    return result;
  }

  async giftGames(dto: GiftGamesDto, userId: string) {
    // Find recipient with their owned games
    const receiver = await this.userRepository.findOne({
      where: { id: dto.friendId },
      relations: ['games'],
    });

    // Add sender's ID to the DTO
    dto.senderId = userId;
    // Perform the gifting
    const result = await this.gameRepository.giftGames(dto, receiver);

    return result;
  }
  async getGames(res: Response) {
    const games = await this.gameRepository.find();
    return res.status(HttpStatus.OK).send(games);
  }

  async getGameById(id: string, res: Response) {
    const game = await this.gameRepository.getGameWithRelations(id);
    return res.status(HttpStatus.OK).send(game);
  }

  async getFilteredGames(res: Response, queryParams?: QueryParamsTypes) {
    const games = await this.gameRepository.findFilteredGames(queryParams);
    return res.status(HttpStatus.OK).send(games);
  }

  async getGenresAndPlatforms(res: Response) {
    const genres = await this.genreRepository.find();
    const platforms = await this.platformRepository.find();
    return res.status(HttpStatus.OK).send({
      genres: classToPlainFromExist<Genre[]>(genres, {
        excludeExtraneousValues: true,
      }),
      platforms: classToPlainFromExist<Platform[]>(platforms, {
        excludeExtraneousValues: true,
      }),
    });
  }
}
