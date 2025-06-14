import type { Item, Prisma } from '@prisma/client';

export class ProductEntity {
  id: number;
  name: string;
  description: string;
  price: number;
  quantityStock: number;
  createdAt: Date;
  updatedAt: Date;

  items?: Item[];

  constructor(input: Partial<ProductEntity>) {
    Object.assign(this, input);
  }
}
