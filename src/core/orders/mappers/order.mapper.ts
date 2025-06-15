import { OrderStatus as DomainOrderStatus } from 'src/shared/order-status.enum';
import { Order as DomainOrder, ItemEntity } from '../interfaces/list-order.usecase.interface';
import { Order, Item, Product } from '@prisma/client';

export type PrismaOrderWithRelations = Order & {
  items: (Item & {
    product: Product;
  })[];
};

export class OrderMapper {
  static toDomain(prismaOrder: PrismaOrderWithRelations): DomainOrder {
    return {
      id: prismaOrder.id,
      clientId: prismaOrder.client_id,
      status: prismaOrder.status as DomainOrderStatus,
      total: prismaOrder.total,
      orderDate: prismaOrder.order_date,
      updatedAt: prismaOrder.updated_at,
      item: prismaOrder.items.map(this.itemToDomain),
    };
  }

  static itemToDomain(item: Item & { product: Product }): ItemEntity {
  return new ItemEntity({
    id: item.id,
    orderId: item.order_id,
    productId: item.product_id,
    quantity: item.quantity,
    pricePerUnit: item.price_per_unit,
    subtotal: item.subtotal,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    product: {
      id: item.product.id,
      name: item.product.name,
      description: item.product.description,
      price: item.product.price,
      quantity_stock: item.product.quantity_stock,
      created_at: item.product.created_at,
      updated_at: item.product.updated_at,
    },
  });
}

}
