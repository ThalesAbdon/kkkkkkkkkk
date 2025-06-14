export interface AddItemUsecaseInput {
  orderId: number;
  productId: number;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
}

export interface AddItemUsecaseOutput {
  subtotal: number;
}
