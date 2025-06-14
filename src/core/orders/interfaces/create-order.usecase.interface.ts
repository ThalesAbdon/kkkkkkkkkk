import { OrderStatus } from '@prisma/client';

export interface CreateOrderUsecaseInput {
  clientId: number;
  total: number;
}

export interface CreateOrderUsecaseOutput {
  id: number;
  clientId: number;
  status: OrderStatus;
  orderDate: Date;
  total: number;
  updatedAt: Date;
}
