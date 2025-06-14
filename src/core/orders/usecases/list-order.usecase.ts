import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { OrderRepository } from '../repository/order.repository';
import {
  ListOrderUsecaseInput,
  Order,
} from '../interfaces/list-order.usecase.interface';

@Injectable()
export class ListOrderUsecase implements IUseCase<ListOrderUsecaseInput, Order[]> {
  constructor(
    @Inject(OrderRepository)
    private readonly _orderRepository: OrderRepository,
  ) {}

  async execute(input: ListOrderUsecaseInput): Promise<Order[]> {
    const ordersPrisma = await this._orderRepository.findAll()

   const orders: Order[] = ordersPrisma.map(order => ({
  id: order.id,
  clientId: order.client_id,
  // Cast explícito para o enum local
  status: order.status as unknown as LocalOrderStatus,
  total: order.total,
  orderDate: order.order_date,
  updatedAt: order.updated_at,
  item: order.items?.map(item => ({
    id: item.id,
    orderId: item.order_id,
    productId: item.product_id,
    quantity: item.quantity,
    pricePerUnit: item.price_per_unit,
    subtotal: item.subtotal,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  })) || [],
}));

    return orders;
  }
}
