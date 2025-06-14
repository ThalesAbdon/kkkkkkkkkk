import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { OrderStatus } from 'src/shared/order-status.enum';

export class ListOrderDtoInput {
  @ApiProperty({ type: String, required: false, example: 'received' })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  @IsOptional()
  status?: OrderStatus;

  @ApiProperty({ type: String, required: false, example: 1 })
  @IsNumberString()
  @IsOptional()
  clientId?: number;

  @ApiProperty({ type: String, required: false, example: 900 })
  @IsNumber()
  @IsOptional()
  total?: number;
}

export class Order {
  id: number;
  clientId: number;
  status: OrderStatus;
  total: number;
  orderDate: Date;
  updatedAt: Date;
}

export class ListOrderDtoOutput {
  orders: Order[];
}
