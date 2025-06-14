export interface FindByIdItemUsecaseInput {
  id: number;
}

export interface FindByIdItemUsecaseOutput extends FindByIdItemUsecaseInput {
  orderId: number;
  productId: number;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
}
