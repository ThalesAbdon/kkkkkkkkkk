import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDtoInput {
  @ApiProperty({ type: String, example: 'admin@email.com' })
  @IsString()
  email: string;

  @ApiProperty({ type: String, example: '12345678' })
  @IsString()
  password: string;
}
