import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Game } from './game.entity';
import { User } from './user.entity';

@Entity('Bucket')
export class Bucket {
  @IsUUID()
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Game, (game) => game.bucket, {
    cascade: ['insert', 'update', 'remove'],
    nullable: true,
  })
  @JoinTable()
  games: Game[];

  totalPrice: number;
}
