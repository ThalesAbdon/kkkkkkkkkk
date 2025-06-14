import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ListOrderUsecase } from 'src/core/orders/usecases/list-order.usecase';
import { GenerateFileApplicationInput } from './interface/generate-file.application.interface';

@Injectable()
export class GenerateFileApplication {
  constructor(
    @Inject(ListOrderUsecase)
    private listOrderUsecase: ListOrderUsecase,
  ) {}

  async execute(input: GenerateFileApplicationInput): Promise<any> {
    try {
      const filters: any = { ...input };

      if (input.orderDate) {
        filters.orderDate = { gt: input.orderDate };
      }

      if (input.updatedAt) {
        filters.updatedAt = { lt: input.updatedAt };
      }

      const orders = await this.listOrderUsecase.execute(filters);

      const report = [];

      for (const order of orders) {
        for (const item of order.item || []) {
          report.push({
            'Identificador do Pedido': item.orderId,
            'Identificador do Produto': item.productId,
            Produto: item.product.name,
            'Quantidade Venda': item.quantity,
            'Preço por unidade': item.pricePerUnit,
            Subtotal: item.subtotal,
          });
        }
      }

      return report;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
