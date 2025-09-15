import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BuyGameDto {
  @ApiProperty({
    description: 'Array of game IDs to purchase',
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '223e4567-e89b-12d3-a456-426614174001',
    ],
  })
  @IsArray()
  games: string[];
}
