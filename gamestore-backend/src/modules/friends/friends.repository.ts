import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Friendship } from '../../entities/friendship.entity';

@Injectable()
export class FriendsRepository extends Repository<Friendship> {
  constructor(dataSource: DataSource) {
    super(Friendship, dataSource.createEntityManager());
  }
  public async sendFriendRequest(userId: string, friendId: string) {
    return await this.createQueryBuilder()
      .insert()
      .into(Friendship)
      .values({
        user: { id: userId },
        friend: { id: friendId },
        status: 'pending',
      })
      .execute();
  }

  public async acceptFriendRequest(requestId: string) {
    return await this.createQueryBuilder()
      .update(Friendship)
      .set({ status: 'accepted' })
      .where('id = :id', { id: requestId })
      .execute();
  }

  public async rejectFriendRequest(requestId: string) {
    return this.createQueryBuilder()
      .delete()
      .from(Friendship)
      .where('id = :id', { id: requestId })
      .execute();
  }

  public async removeFriend(userId: string, friendId: string) {
    return this.createQueryBuilder()
      .delete()
      .from(Friendship)
      .where(
        '((userId = :userId AND friendId = :friendId) OR (userId = :friendId AND friendId = :userId))',
        { userId, friendId },
      )
      .execute();
  }

  public async getPendingRequests(userId: string) {
    const pendingRequests = await this.createQueryBuilder('friendship')
      .where('friendship.userId = :userId AND friendship.status = :status', {
        userId,
        status: 'pending',
      })
      .leftJoinAndSelect('friendship.friend', 'friend') // friend is the recipient of the request
      .getMany();

    // Return the friends who received the request from the user
    return pendingRequests.map((f) => f.friend);
  }

  public async getFriends(userId: string) {
    const friendships = await this.createQueryBuilder('friendship')
      .where(
        '(friendship.userId = :userId OR friendship.friendId = :userId) AND friendship.status = :status',
        { userId, status: 'accepted' },
      )
      .leftJoinAndSelect('friendship.user', 'user')
      .leftJoinAndSelect('friendship.friend', 'friend')
      .getMany();

    return friendships.map((f) => (f.user.id === userId ? f.friend : f.user));
  }

  public async cancelFriendRequest(requestId: string) {
    return this.createQueryBuilder()
      .delete()
      .from(Friendship)
      .where('id = :id', { id: requestId })
      .execute();
  }

  public async getIncomingRequests(friendId: string) {
    const requests = await this.createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.user', 'user')
      .leftJoinAndSelect('friendship.friend', 'friend')
      .where(
        'friendship.friendId = :friendId AND friendship.status = :status',
        {
          friendId,
          status: 'pending',
        },
      )
      .getMany();

    const data = requests.map((request) => ({
      id: request.id,
      friendId: request.friend.id,
      userId: request.user.id,
      status: request.status,
    }));
    return data;
  }
  public async getOutgoingRequests(userId: string) {
    const requests = await this.createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.user', 'user')
      .leftJoinAndSelect('friendship.friend', 'friend')
      .where('friendship.userId = :userId AND friendship.status = :status', {
        userId,
        status: 'pending',
      })
      .getMany();

    return requests.map((request) => ({
      id: request.id,
      friendId: request.friend.id,
      userId: request.user.id,
      status: request.status,
    }));
  }
}
