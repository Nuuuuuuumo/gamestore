import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { readableStreamLikeToAsyncGenerator } from 'rxjs/internal/util/isReadableStreamLike';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractAccessToken,
      ]),
      secretOrKey: configService.get('SECRET_KEY'),
      ignoreExpiration: false,
    });
  }

  public static extractAccessToken(req: Request): string | null {
    if (
      req.cookies &&
      'accessToken' in req.cookies &&
      req.cookies.accessToken.length > 0
    ) {
      return req.cookies.accessToken;
    }
    return null;
  }

  async validate(payload: any) {
    if (!payload) {
      return null;
    }
    const user = await this.userRepository.findOne({
      where: { id: payload.sub.id },
      relations: ['games'],
    });
    if (!user) return null;
    return user;
  }
}
