import { FriendsRepository } from './friends.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendsService {
  constructor(private readonly friendsRepo: FriendsRepository) {}

  async sendRequest(userId: string, friendId: string) {
    if (userId === friendId) throw new Error('Нельзя добавить себя в друзья');
    return await this.friendsRepo.sendFriendRequest(userId, friendId);
  }

  async acceptRequest(requestId: string) {
    return await this.friendsRepo.acceptFriendRequest(requestId);
  }

  async rejectRequest(requestId: string) {
    return await this.friendsRepo.rejectFriendRequest(requestId);
  }
  async getPendingFriendRequests(userId: string) {
    return this.friendsRepo.getPendingRequests(userId);
  }

  async removeFriend(userId: string, friendId: string) {
    return await this.friendsRepo.removeFriend(userId, friendId);
  }

  async getFriends(userId: string) {
    return await this.friendsRepo.getFriends(userId);
  }
  async cancelFriendRequest(requestId: string) {
    return await this.friendsRepo.cancelFriendRequest(requestId);
  }

  getIncomingRequests(friendId: string) {
    return this.friendsRepo.getIncomingRequests(friendId);
  }

  getOutgoingRequests(userId: string) {
    return this.friendsRepo.getOutgoingRequests(userId);
  }
}
