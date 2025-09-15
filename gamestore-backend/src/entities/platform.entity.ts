import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { Game } from './game.entity';
import { Exclude } from 'class-transformer';

@Entity('Platform')
export class Platform {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsString()
  name: string;

  @ManyToMany(() => Game, (game) => game.platforms)
  @Exclude()
  games: Game[];
}
