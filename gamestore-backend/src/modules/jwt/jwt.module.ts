import { Module } from '@nestjs/common';
import { JWTService } from './jwt.service';

@Module({
  providers: [JWTService],
})
export class JwtModule {}
