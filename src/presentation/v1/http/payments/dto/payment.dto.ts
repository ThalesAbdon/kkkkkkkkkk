import { IsInt } from 'class-validator';

export class PaymentDtoInput {
  @IsInt()
  orderId: number;

  @IsInt()
  amount: number;
}
