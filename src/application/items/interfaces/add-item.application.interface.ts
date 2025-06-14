export interface AddItemApplicationInput {
  orderId: number;
  productId: number;
  quantity: number;
}

export interface AddItemApplicationOutput {
  message: string;
}
