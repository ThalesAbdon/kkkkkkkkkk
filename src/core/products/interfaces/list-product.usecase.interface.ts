export interface ListProductUsecaseInput {
  name?: string;
  description?: string;
  price?: number;
  quantityStock?: number;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantityStock: number;
  createdAt: Date;
  updatedAt: Date;
}
