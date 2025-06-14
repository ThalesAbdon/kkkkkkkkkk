export interface UpdateProductUsecaseInput {
  name?: string;
  description?: string;
  price?: number;
  quantityStock?: number;
}

export interface UpdateProductUsecaseOutput extends UpdateProductUsecaseInput {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
