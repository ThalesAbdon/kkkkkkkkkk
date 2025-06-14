import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import {
  CreateOrderUsecaseInput,
  CreateOrderUsecaseOutput,
} from '../interfaces/create-order.usecase.interface';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
export class CreateOrderUsecase
  implements IUseCase<CreateOrderUsecaseInput, CreateOrderUsecaseOutput>
{
  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(
    input: CreateOrderUsecaseInput,
  ): Promise<CreateOrderUsecaseOutput> {
    const order = await this.orderRepository.create({
      client: { connect: { id: input.clientId } },
      total: input.total,
    });

    return {
      id: order.id,
      clientId: order.client_id,
      total: order.total,
      status: order.status,
      orderDate: order.order_date,
      updatedAt: order.updated_at,
    };
  }
}
