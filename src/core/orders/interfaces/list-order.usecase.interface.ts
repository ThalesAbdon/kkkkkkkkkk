import { ItemEntity } from 'src/core/items/entity/item.entity';
import { OrderStatus } from 'src/shared/order-status.enum';

export interface ListOrderUsecaseInput {
  status?: OrderStatus;
  clientId?: number;
  total?: number;
}

export interface Order {
  id: number;
  clientId: number;
  status: OrderStatus;
  total: number;
  orderDate: Date;
  updatedAt: Date;
  item?: ItemEntity[];
}

export interface ListOrderUsecaseOutput {
  orders: Order[];
}

export { ItemEntity };
