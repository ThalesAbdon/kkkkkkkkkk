import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/presentation/enum/role.enum';
import { CreateProductDtoInput } from '../dto/create-product.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Roles } from 'src/presentation/roles.decorator';
import { RolesGuard } from 'src/presentation/guard/roles.guard';
import { createPipe } from 'src/shared/utils/create-pipe';
import { CreateUserDtoOutput } from '../../users/dto/create.dto';
import { CreateProductApplication } from 'src/application/products/create-product.application';
import {
  ListProductDtoInput,
  ListProductDtoOutput,
} from '../dto/list-product.dto';
import { ListProductApplication } from 'src/application/products/list-product.application';
import { FindByIdProductDtoInput } from '../dto/find-by-id-product.dto';
import { FindByIdProductApplication } from 'src/application/products/find-by-id-product.application';
import { UpdateProductDtoInput } from '../dto/update-product.dto';
import { UpdateProductApplication } from 'src/application/products/update-product.application';
import { DeleteProductDtoInput } from '../dto/delete-product.dto';
import { DeleteProductApplication } from 'src/application/products/delete-product.application';

@Controller({
  path: 'products',
})
@ApiTags('product')
export class ProductController {
  constructor(
    @Inject(CreateProductApplication)
    private createProductApplication: CreateProductApplication,
    @Inject(ListProductApplication)
    private listProductApplication: ListProductApplication,
    @Inject(FindByIdProductApplication)
    private findByIdProductApplication: FindByIdProductApplication,
    @Inject(UpdateProductApplication)
    private updateProductApplication: UpdateProductApplication,
    @Inject(DeleteProductApplication)
    private deleteProductApplication: DeleteProductApplication,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UsePipes(createPipe(CreateProductDtoInput))
  @ApiBody({ type: CreateProductDtoInput, required: true })
  async create(
    @Body()
    input: CreateProductDtoInput,
  ): Promise<CreateUserDtoOutput> {
    return await this.createProductApplication.execute(input);
  }

  @Get()
  @Roles(Role.Admin, Role.Client)
  @UseGuards(RolesGuard)
  async list(
    @Query()
    input: ListProductDtoInput,
  ): Promise<ListProductDtoOutput> {
    return await this.listProductApplication.execute(input);
  }

  @Get('/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async findById(
    @Param()
    input: FindByIdProductDtoInput,
  ): Promise<Record<string, any>> {
    return await this.findByIdProductApplication.execute(input);
  }

  @Patch('/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async update(
    @Param()
    id: FindByIdProductDtoInput,
    @Body()
    input: UpdateProductDtoInput,
  ): Promise<Record<string, any>> {
    return await this.updateProductApplication.execute(id, input);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async deleteProduct(
    @Param()
    input: DeleteProductDtoInput,
  ): Promise<Record<string, any>> {
    return await this.deleteProductApplication.execute(input);
  }
}
