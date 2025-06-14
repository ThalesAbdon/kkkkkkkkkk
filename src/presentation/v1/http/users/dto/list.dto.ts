import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/shared/user-role.enum';

export class ListUserDtoInput {
  @ApiProperty({ type: String, required: false, example: 'Luffy' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, required: false, example: 'luffy@gmail.com' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ type: String, required: false, example: 'client' })
  @IsEnum(UserRole)
  @IsNotEmpty()
  @IsOptional()
  type?: UserRole;
}

export class User {
  id: number;
  name: string;
  email: string;
  type: UserRole;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ListUserDtoOutput {
  users: User[];
}
