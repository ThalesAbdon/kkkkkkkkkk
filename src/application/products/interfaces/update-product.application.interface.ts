export interface UpdateProductApplicationInput {
  name?: string;
  description?: string;
  price?: number;
  quantityStock?: number;
}

export interface UpdateProductApplicationOutput {
  message: string;
}
