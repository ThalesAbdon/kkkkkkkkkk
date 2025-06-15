import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { OrderRepository } from '../repository/order.repository';
import {
  ListOrderUsecaseInput,
  Order,
} from '../interfaces/list-order.usecase.interface';

@Injectable()
export class ListOrderUsecase
  implements IUseCase<ListOrderUsecaseInput, Order[]>
{
  constructor(
    @Inject(OrderRepository) private readonly _orderRepository: OrderRepository,
  ) {}
  async execute(input: ListOrderUsecaseInput): Promise<Order[]> {
    return await this._orderRepository.get(input);
  }
}
