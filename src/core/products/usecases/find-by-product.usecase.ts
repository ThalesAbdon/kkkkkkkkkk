import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { ProductRepository } from '../repository/product.repository';
import { FindByIdProductUsecaseInput } from '../interfaces/find-by-id-product.usecase.interface';
import { ProductEntity } from '../entity/product.entity';

@Injectable()
export class FindByIdProductUsecase
  implements IUseCase<FindByIdProductUsecaseInput, ProductEntity>
{
  constructor(
    @Inject(ProductRepository)
    private readonly _productRepository: ProductRepository,
  ) {}
  async execute(input: FindByIdProductUsecaseInput): Promise<ProductEntity> {
    const product = await this._productRepository.findOne(input);
    return product;
  }
}
