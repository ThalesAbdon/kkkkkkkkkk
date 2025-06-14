import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDtoInput {
  @ApiProperty({
    type: String,
    example: 'Notebook Acer Nitro V15 Anv15-51-57ws',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @MinLength(2)
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @ApiProperty({
    type: String,
    example:
      'O Notebook Gamer Acer Nitro V15 Anv15-51-57ws é perfeito para quem busca alto desempenho em jogos e tarefas pesadas.',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  description: string;

  @ApiProperty({ type: Number, example: 4299 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01, { message: 'Price must be greater than or equal to 0' })
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (typeof value === 'number') {
      return parseFloat(value.toFixed(2));
    }
    return value;
  })
  price: number;

  @ApiProperty({ type: Number, example: 10 })
  @IsInt()
  @Min(1, { message: 'Quantity in Stock must be greater than or equal to 1' })
  @IsNotEmpty()
  quantityStock: number;
}

export class CreateProductDtoOutput {
  message: string;
}
