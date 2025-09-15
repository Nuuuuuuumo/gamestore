import { Module } from '@nestjs/common';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Game } from '../../entities/game.entity';
import { Bucket } from '../../entities/bucket.entity';
import { BucketRepository } from './bucket.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Game, Bucket])],
  controllers: [BucketController],
  providers: [BucketService, BucketRepository],
})
export class BucketModule {}
