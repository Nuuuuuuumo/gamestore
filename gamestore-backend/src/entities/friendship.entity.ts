import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';

@Entity('Friendship')
export class Friendship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.friendships)
  user: User;

  @ManyToOne(() => User)
  friend: User;

  @Column({ default: 'pending' }) // pending, accepted, rejected
  status: string;
}
