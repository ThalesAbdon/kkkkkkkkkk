import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { createPipe } from 'src/shared/utils/create-pipe';
import {
  CreateOrderDtoInput,
  CreateOrderDtoOutput,
} from '../dto/create-order.dto';
import { CreateOrderApplication } from 'src/application/orders/create-order.application';
import { Roles } from 'src/presentation/roles.decorator';
import { Role } from 'src/presentation/enum/role.enum';
import { RolesGuard } from 'src/presentation/guard/roles.guard';
import { ClientUserHttpDtoInput } from '../../clients/dto/user-http-context.dto';
import { FindByIdOrderDtoInput } from '../dto/find-by-id-order-dto';
import { UpdateOrderStatusDtoInput } from '../dto/update-status.dto';
import { UpdateOrderStatusApplication } from 'src/application/orders/update-order-status.application';
import { ListOrderDtoInput, ListOrderDtoOutput } from '../dto/list-order.dto';
import { ListOrderApplication } from 'src/application/orders/list-order.application';
import { DeleteOrderDtoInput } from '../dto/delete-order.dto';
import { DeleteOrderApplication } from 'src/application/orders/delete-order.application';

@Controller({
  path: 'orders',
})
@ApiTags('order')
export class OrderController {
  constructor(
    @Inject(CreateOrderApplication)
    private createOrderApplication: CreateOrderApplication,
    @Inject(UpdateOrderStatusApplication)
    private updateOrderStatusApplication: UpdateOrderStatusApplication,
    @Inject(ListOrderApplication)
    private listOrderApplication: ListOrderApplication,
    @Inject(DeleteOrderApplication)
    private deleteOrderApplication: DeleteOrderApplication,
  ) {}
  @Post('')
  @UseGuards(RolesGuard)
  @Roles(Role.Client)
  @UsePipes(createPipe(CreateOrderDtoInput))
  @ApiBody({ type: CreateOrderDtoInput, required: true })
  async createOrder(
    @Req()
    request: any,
    @Body()
    input: CreateOrderDtoInput,
  ): Promise<CreateOrderDtoOutput> {
    const user: ClientUserHttpDtoInput = request?.user;
    return await this.createOrderApplication.execute(input, user.client.id);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async list(
    @Query()
    input: ListOrderDtoInput,
  ): Promise<ListOrderDtoOutput> {
    return await this.listOrderApplication.execute(input);
  }

  @Patch('/:id')
  @Roles(Role.Client)
  @UseGuards(RolesGuard)
  async update(
    @Param()
    id: FindByIdOrderDtoInput,
    @Body()
    input: UpdateOrderStatusDtoInput,
  ): Promise<Record<string, any>> {
    return await this.updateOrderStatusApplication.execute(id, input);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async deleteUser(
    @Param()
    input: DeleteOrderDtoInput,
  ): Promise<Record<string, any>> {
    return await this.deleteOrderApplication.execute(input);
  }
}
