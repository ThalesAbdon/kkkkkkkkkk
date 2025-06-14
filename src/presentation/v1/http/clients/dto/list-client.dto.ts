import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class ListClientDtoInput {
  @ApiProperty({ type: String, required: false, example: 'Son Goku' })
  @IsString()
  @MaxLength(400)
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  fullName?: string;

  @ApiProperty({ type: String, required: false, example: '11954771162' })
  @IsString()
  @Length(11)
  @Matches('[0-9]')
  @IsOptional()
  contact?: string;

  @ApiProperty({ type: String, required: false, example: 'Distrito Leste 439' })
  @IsString()
  @MaxLength(600)
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  address?: string;
}

export class Client {
  id: number;
  fullName: string;
  contact: string;
  address: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ListClientDtoOutput {
  clients: Client[];
}
