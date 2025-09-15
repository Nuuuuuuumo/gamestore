import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  avatarURL: string;
}
