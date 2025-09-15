import { ApiProperty } from '@nestjs/swagger';

export class DeleteGameFromBucketDto {
  @ApiProperty({ description: 'The id of the game' })
  gameId: string;

  @ApiProperty({ description: 'The id of the bucket' })
  bucketId: string;
}
