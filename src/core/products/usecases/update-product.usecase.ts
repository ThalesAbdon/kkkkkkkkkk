import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import {
  UpdateProductUsecaseInput,
  UpdateProductUsecaseOutput,
} from '../interfaces/update-product.usecase.interface';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class UpdateProductUsecase
  implements IUseCase<UpdateProductUsecaseInput, UpdateProductUsecaseOutput>
{
  constructor(
    @Inject(ProductRepository)
    private readonly _productRepository: ProductRepository,
  ) {}

  async execute(
    input: UpdateProductUsecaseInput & { id: number },
  ): Promise<UpdateProductUsecaseOutput> {
    const { id, ...updateData } = input;
    const updatedProduct = await this._productRepository.save({ id, ...updateData });

    // Mapeando os campos para camelCase (para bater com a interface)
    return {
      id: updatedProduct.id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      quantityStock: updatedProduct.quantity_stock,
      createdAt: updatedProduct.created_at,
      updatedAt: updatedProduct.updated_at,
    };
  }
}
