import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ListProductDtoInput {
  @ApiProperty({ type: String, required: false, example: 'Maria' })
  @IsString()
  @MaxLength(300)
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  name?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'algo sobre um produto',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: Number, required: false, example: 42 })
  @IsOptional()
  price?: number;

  @ApiProperty({ type: Number, required: false, example: 100 })
  @IsOptional()
  quantityStock?: number;
}

export class Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantityStock: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ListProductDtoOutput {
  products: Product[];
}
