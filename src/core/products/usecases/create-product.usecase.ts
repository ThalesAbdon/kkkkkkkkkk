import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { ProductRepository } from '../repository/product.repository';
import {
  CreateProductUsecaseInput,
  CreateProductUsecaseOutput,
} from '../interfaces/create-product.usecase.interface';

@Injectable()
export class CreateProductUsecase
  implements IUseCase<CreateProductUsecaseInput, CreateProductUsecaseOutput>
{
  constructor(
    @Inject(ProductRepository)
    private readonly _productRepository: ProductRepository,
  ) {}
  async execute(
    input: CreateProductUsecaseInput,
  ): Promise<CreateProductUsecaseOutput> {
    return await this._productRepository.create(input);
  }
}
