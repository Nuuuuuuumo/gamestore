import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../strategy/jwt.strategy';
import { JWTService } from '../jwt/jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { AwsService } from '../aws/aws.service';
import { Bucket } from '../../entities/bucket.entity';
import { BucketRepository } from '../bucket/bucket.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('SECRET_KEY'),
          signOptions: {
            expiresIn: '60s',
          },
        };
      },
    }),
    TypeOrmModule.forFeature([User, Bucket]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JWTService,
    AwsService,
    BucketRepository,
  ],
})
export class AuthModule {}
