import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { Friendship } from '../../entities/friendship.entity';
import { FriendsRepository } from './friends.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Friendship])],
  controllers: [FriendsController],
  providers: [FriendsService, FriendsRepository],
})
export class FriendsModule {}
