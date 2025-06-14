export interface CreateProductApplicationInput {
  name: string;
  description: string;
  price: number;
  quantityStock: number;
}

export interface CreateProductApplicationOutput {
  message: string;
}
