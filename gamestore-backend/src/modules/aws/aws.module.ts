import { Module } from '@nestjs/common';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AwsController],
  providers: [AwsService, ConfigService],
})
export class AwsModule {}
