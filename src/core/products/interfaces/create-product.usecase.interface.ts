export interface CreateProductUsecaseInput {
  name: string;
  description: string;
  price: number;
  quantityStock: number;
}

export interface CreateProductUsecaseOutput extends CreateProductUsecaseInput {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
