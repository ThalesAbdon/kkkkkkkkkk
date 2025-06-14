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
    return await this._productRepository.get(input);
  }
}
