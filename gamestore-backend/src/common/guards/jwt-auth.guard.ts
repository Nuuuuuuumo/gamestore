import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('Token is expired');
    }
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid token');
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
