import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { IsTrimmedNotEmpty } from '../common/validators/string/IsNotEmptyAfterTrim';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Genre } from './genre.entity';
import { Platform } from './platform.entity';
import { Bucket } from './bucket.entity';

@Entity('Game')
export class Game {
  @IsUUID()
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the game', required: false })
  @IsString()
  @Validate(IsTrimmedNotEmpty)
  @Column()
  title!: string;

  @ApiProperty({ description: 'The genre of the game' })
  @ManyToMany(() => Genre, (genre) => genre.games, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  @JoinTable()
  genres: string;

  @ManyToMany(() => Bucket, (bucket) => bucket.games, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  bucket: Bucket;

  @ApiProperty({
    description: 'The price of the game',
    default: 1.11,
    type: Number,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Adjust precision and scale as needed
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'The description of the game' })
  @IsString()
  @Column('text')
  description!: string;

  @Exclude()
  @ApiProperty({ description: 'Users, who have this game' })
  @ManyToMany(() => User, (user) => user.games, {
    cascade: ['insert', 'update', 'remove'],
    nullable: true,
  })
  @JoinTable()
  usersOwned: User[];

  @ApiProperty({ description: 'The platform of the game' })
  @ManyToMany(() => Platform, (platform) => platform.games, {
    cascade: ['insert', 'update', 'remove'],
    nullable: true,
  })
  @JoinTable()
  platforms: Platform[];

  @ApiProperty({ description: 'The publisher of the game' })
  @IsString()
  @Validate(IsTrimmedNotEmpty)
  @Column()
  publisher: string;

  @ApiProperty({ description: 'The developer of the game' })
  @IsString()
  @Validate(IsTrimmedNotEmpty)
  @Column()
  developer: string;

  @ApiProperty({
    description: 'The rating of the game',
    default: 1.1,
    type: Number,
  })
  @Column({ type: 'decimal', precision: 10, default: 0 })
  rating: number;

  @ApiProperty({ description: 'The imageUrl of the game' })
  @IsString()
  @Validate(IsTrimmedNotEmpty)
  @Column('text')
  imageUrl: string;

  @ApiProperty({ description: 'Is multiplayer support' })
  @IsBoolean()
  @IsNotEmpty()
  @Column({ type: 'boolean' })
  multiplayerSupport: boolean;

  @ApiProperty({ description: 'Is multiplayer support' })
  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
