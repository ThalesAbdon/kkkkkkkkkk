import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { ProductRepository } from '../repository/product.repository';
import {
  ListProductUsecaseInput,
  Product,
} from '../interfaces/list-product.usecase.interface';

@Injectable()
export class ListProductUsecase
  implements IUseCase<ListProductUsecaseInput, Product[]>
{
  constructor(
    @Inject(ProductRepository)
    private readonly _productRepository: ProductRepository,
  ) {}

  async execute(input: ListProductUsecaseInput): Promise<Product[]> {
    const where = {};

    if (input.name) {
      Object.assign(where, {
        name: { contains: input.name, mode: 'insensitive' },
      });
    }

    if (input.description) {
      Object.assign(where, {
        description: { contains: input.description, mode: 'insensitive' },
      });
    }

    if (input.price) {
      Object.assign(where, { price: input.price });
    }

    if (input.quantityStock) {
      Object.assign(where, { quantity_stock: input.quantityStock });
    }

    const products = await this._productRepository.findBy(where);

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantityStock: product.quantity_stock,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    }));
  }
}
