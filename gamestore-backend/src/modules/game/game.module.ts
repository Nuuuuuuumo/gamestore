import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { GameRepository } from './game.repository';
import { Platform } from '../../entities/platform.entity';
import { Genre } from '../../entities/genre.entity';
import { AwsService } from '../aws/aws.service';
import { BucketRepository } from '../bucket/bucket.repository';
import { Bucket } from '../../entities/bucket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Platform, Genre, Bucket])],
  controllers: [GameController],
  providers: [GameService, GameRepository, AwsService, BucketRepository],
})
export class GameModule {}
