import { Order, Product, Item } from '@prisma/client';

export class ItemEntity implements Item {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;

  order?: Order;
  product?: Product;

  constructor(input: Partial<ItemEntity>) {
    Object.assign(this, input);
  }
  updated_at: Date;
  created_at: Date;
  order_id: number;
  product_id: number;
  price_per_unit: number;
}
