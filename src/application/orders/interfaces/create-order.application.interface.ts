export interface Product {
  productId: number;
  quantity: number;
}

export interface CreateOrderApplicationInput {
  products: Product[];
}

export interface CreateOrderApplicationOutput {
  message: string;
}
