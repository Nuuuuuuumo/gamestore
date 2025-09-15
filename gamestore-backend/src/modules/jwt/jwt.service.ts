import { Inject, Injectable } from '@nestjs/common';
import { JwtService as JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../entities/user.entity';
import { Response } from 'express';

@Injectable()
export class JWTService extends JwtService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    super();
  }

  async generateTokens(user: User, res: Response) {
    try {
      const payload = {
        sub: {
          id: user.id,
          email: user.email,
        },
      };
      const accessToken = this.sign(payload, {
        expiresIn: '20m',
        secret: this.configService.get('SECRET_KEY'),
      });

      const refreshToken = this.sign(payload, {
        expiresIn: '7d',
        secret: this.configService.get('SECRET_KEY'),
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
}
