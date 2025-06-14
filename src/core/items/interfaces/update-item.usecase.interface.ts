export interface UpdateItemUsecaseInput {
  quantity: number;
  subtotal: number;
}

export interface UpdateItemUsecaseOutput extends UpdateItemUsecaseInput {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
}
