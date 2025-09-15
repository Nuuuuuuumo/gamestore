import { User } from '../../../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Platform } from '../../../entities/platform.entity';
import { Genre } from '../../../entities/genre.entity';

export class GameDto {
  @ApiProperty({ description: 'The name of the game' })
  id: string;

  @ApiProperty({ description: 'The name of the game' })
  title: string;

  @ApiProperty({ description: 'The genre of the game' })
  @Exclude()
  genre: Genre[];

  @ApiProperty({
    description: 'The price of the game',
    default: 1.11,
    type: Number,
  })
  price: number;

  @ApiProperty({ description: 'The description of the game' })
  description!: string;

  @Exclude()
  @ApiProperty({ description: 'Users, who have this game' })
  usersOwned: User[];

  @ApiProperty({ description: 'The platform of the game' })
  @Exclude()
  platform: Platform[];

  @ApiProperty({ description: 'The publisher of the game' })
  publisher: string;

  @ApiProperty({ description: 'The developer of the game' })
  developer: string;

  @ApiProperty({ description: 'The rating of the game' })
  rating: string;

  @ApiProperty({ description: 'The imageUrl of the game' })
  imageUrl: string;

  @ApiProperty({ description: 'Is multiplayer support' })
  multiplayerSupport: boolean;

  @ApiProperty({ description: 'Is multiplayer support' })
  createdAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
