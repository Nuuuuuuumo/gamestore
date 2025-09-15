import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { GameModule } from './modules/game/game.module';
import { Game } from './entities/game.entity';
import { AwsModule } from './modules/aws/aws.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { BucketModule } from './modules/bucket/bucket.module';
import { FriendsModule } from './modules/friends/friends.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Game]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [__dirname + '/entities/*.entity{.js, .ts}'],
        schema: 'public',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    GameModule,
    AwsModule,
    JwtModule,
    BucketModule,
    FriendsModule,
  ],
  providers: [AppService],
  controllers: [],
})
export class AppModule {}
