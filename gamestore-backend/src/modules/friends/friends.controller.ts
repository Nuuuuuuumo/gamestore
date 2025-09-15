import {
  Controller,
  Post,
  Param,
  UseGuards,
  Req,
  Delete,
  Get,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtGuard } from '../../common/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('friends')
@UseGuards(JwtGuard)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('request/:id')
  async sendRequest(@Req() req: Request, @Param('id') friendId: string) {
    return this.friendsService.sendRequest(req.user.id, friendId);
  }

  @Post('accept/:requestId')
  async acceptRequest(@Param('requestId') requestId: string) {
    return this.friendsService.acceptRequest(requestId);
  }

  @Post('reject/:requestId')
  async rejectRequest(@Param('requestId') requestId: string) {
    return this.friendsService.rejectRequest(requestId);
  }

  @Get('requests')
  @UseGuards(JwtGuard) // if you're using JWT auth
  async getPendingRequests(@Req() req: Request) {
    const userId = req.user.id;
    return this.friendsService.getPendingFriendRequests(userId);
  }

  @Post('cancel/:requestId')
  @UseGuards(JwtGuard) // if you're using JWT auth
  async cancelFriendRequest(@Param('requestId') requestId: string) {
    return this.friendsService.cancelFriendRequest(requestId);
  }

  @Delete(':friendId')
  async removeFriend(@Req() req: Request, @Param('friendId') friendId: string) {
    return this.friendsService.removeFriend(req.user.id, friendId);
  }

  @UseGuards(JwtGuard)
  @Get('incoming-requests')
  getIncomingRequests(@Req() req: Request) {
    return this.friendsService.getIncomingRequests(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get('outgoing-requests')
  getOutgoingRequests(@Req() req: Request) {
    return this.friendsService.getOutgoingRequests(req.user.id);
  }

  @Get('list')
  async getFriends(@Req() req: Request) {
    return this.friendsService.getFriends(req.user.id);
  }
}
