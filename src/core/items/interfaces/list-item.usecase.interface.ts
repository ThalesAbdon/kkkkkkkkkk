export interface ListItemUsecaseInput {
  orderId?: number;
  productId?: number;
  quantity?: number;
  pricePerUnit?: number;
  subtotal?: number;
}

export interface Item {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
}
