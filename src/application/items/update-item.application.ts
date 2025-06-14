import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { FindByIdItemUsecase } from 'src/core/items/usecases/find-by-id-item.usecase';
import { FindByIdOrderUsecase } from 'src/core/orders/usecases/find-by-id-order.usecase';

import { UpdateItemUsecase } from 'src/core/items/usecases/update-item.usecase';
import { UpdateOrderUsecase } from 'src/core/orders/usecases/update-order.usecase';
import { FindByIdItemApplicationInput } from './interfaces/find-by-id-item.application.interface';
import {
  UpdateItemApplicationInput,
  UpdateItemApplicationOutput,
} from './interfaces/update-item.application.interface';
import { FindByIdProductUsecase } from 'src/core/products/usecases/find-by-product.usecase';
import { OrderStatus } from 'src/shared/order-status.enum';

@Injectable()
export class UpdateItemApplication {
  constructor(
    @Inject(UpdateItemUsecase)
    private updateItemUsecase: UpdateItemUsecase,
    @Inject(FindByIdItemUsecase)
    private findByIdItemUsecase: FindByIdItemUsecase,
    @Inject(FindByIdProductUsecase)
    private findByIdProductUsecase: FindByIdProductUsecase,
    @Inject(FindByIdOrderUsecase)
    private findByIdOrderUsecase: FindByIdOrderUsecase,
    @Inject(UpdateOrderUsecase)
    private updateOrderUsecase: UpdateOrderUsecase,
  ) {}
  async execute(
    param: FindByIdItemApplicationInput,
    input: UpdateItemApplicationInput,
  ): Promise<UpdateItemApplicationOutput> {
    try {
      const item = await this.findByIdItemUsecase.execute(param);
      if (!item?.id) {
        throw new BadRequestException('Item not found!');
      }
      const product = await this.findByIdProductUsecase.execute({
        id: item.productId,
      });
      if (input.quantity > product.quantityStock) {
        throw new NotFoundException('OUT OF STOCK!');
      }
      const order = await this.findByIdOrderUsecase.execute({
        id: item.orderId,
      });
      if (!order?.id) {
        throw new NotFoundException('Order not found!');
      }
      if (order.status != OrderStatus.received) {
        throw new BadRequestException(`Order already ${order.status}`);
      }
      const updatedItem = await this.updateItemUsecase.execute({
        id: item.id,
        quantity: input.quantity,
        subtotal: input.quantity * item.pricePerUnit,
      });
      const updatedTotal = order.total - item.subtotal + updatedItem.subtotal;
      await this.updateOrderUsecase.execute({
        id: order.id,
        total: updatedTotal,
      });
      return { message: 'Item updated!' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
