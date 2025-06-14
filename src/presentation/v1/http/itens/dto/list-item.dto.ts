import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ListItemDtoInput {
  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  orderId?: number;

  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  productId?: number;

  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  quantity?: number;

  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  pricePerUnit?: number;

  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  subtotal?: number;
}

export class Item {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ListItemDtoOutput {
  items: Item[];
}
