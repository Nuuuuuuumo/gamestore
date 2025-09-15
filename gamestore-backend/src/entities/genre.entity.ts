import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Game } from './game.entity';
import { Exclude } from 'class-transformer';

@Entity('Genre')
export class Genre {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsString({ message: 'Name must be a string' }) // Ensure it's a string
  @IsNotEmpty({ message: 'Name is required' }) // Ensure it's not empty
  name: string;

  @ManyToMany(() => Game, (game) => game.genres)
  @Exclude()
  games: string;
}
