import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './game.entity';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Bucket } from './bucket.entity';
import { Friendship } from './friendship.entity';

@Entity('User')
export class User {
  @IsUUID()
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @OneToMany(() => Friendship, (friendship) => friendship.user)
  friendships: Friendship[];

  @ManyToMany(() => Game, (game) => game.usersOwned)
  games: Game[];

  @OneToOne(() => Bucket, (bucket) => bucket.user)
  bucket: Bucket;

  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  @Column()
  avatarURL: string;

  @CreateDateColumn()
  createdAt: Date;
}
