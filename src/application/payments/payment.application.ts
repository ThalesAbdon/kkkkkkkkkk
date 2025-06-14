import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ListItemUsecase } from 'src/core/items/usecases/list-item.usecase';
import { UpdateOrderStatusUsecase } from 'src/core/orders/usecases/update-order-status.usecase';
import { PaymentUsecase } from 'src/core/payments/usecases/payment.usecase';

import { FindByIdProductUsecase } from 'src/core/products/usecases/find-by-product.usecase';
import { UpdateProductUsecase } from 'src/core/products/usecases/update-product.usecase';
import { OrderStatus } from 'src/shared/order-status.enum';

export interface PaymentApplicationInput {
  amount: number;
  orderId: number;
}

export interface PaymentApplicationOutput {
  success: boolean;
  message: string;
}

@Injectable()
export class PaymentApplication {
  constructor(
    @Inject(PaymentUsecase) private readonly paymentUsecase: PaymentUsecase,
    @Inject(UpdateOrderStatusUsecase)
    private readonly updateOrderStatusUsecase: UpdateOrderStatusUsecase,
    @Inject(UpdateProductUsecase)
    private readonly updateProductUsecase: UpdateProductUsecase,
    @Inject(ListItemUsecase)
    private readonly listItemUsecase: ListItemUsecase,
    @Inject(FindByIdProductUsecase)
    private readonly findByIdProductUsecase: FindByIdProductUsecase,
  ) {}

  async execute(
    input: PaymentApplicationInput,
  ): Promise<PaymentApplicationOutput> {
    try {
      const data = await this.paymentUsecase.execute(input);
      if (!data.success) {
        throw new BadRequestException('Invalid amount');
      }
      await this.updateOrderStatusUsecase.execute({
        id: input.orderId,
        status: OrderStatus.preparation,
      });
      const item = await this.listItemUsecase.execute({
        orderId: input.orderId,
      });

      for (const iten of item) {
        const product = await this.findByIdProductUsecase.execute({
          id: iten.productId,
        });
        await this.updateProductUsecase.execute({
          id: iten.productId,
          quantityStock: product.quantityStock - iten.quantity,
        });
      }

      return data;
    } catch (error) {
      throw new InternalServerErrorException('Payment proccess fail');
    }
  }
}
