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
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/presentation/roles.decorator';
import { createPipe } from 'src/shared/utils/create-pipe';
import { RolesGuard } from 'src/presentation/guard/roles.guard';
import { Role } from 'src/presentation/enum/role.enum';
import { AddItemDtoInput, AddItemDtoOutput } from '../dto/add-item.dto';
import { AddItemApplication } from 'src/application/items/add-item.application';
import {
  RemoveItemDtoInput,
  RemoveItemDtoOutput,
} from '../dto/remove-item.dto';
import { RemoveItemApplication } from 'src/application/items/remove-item.application';
import { UpdateItemDtoInput } from '../dto/update-item.dto';
import { FindByIdItemDtoInput } from '../dto/find-by-id-item.dto';
import { UpdateItemApplication } from 'src/application/items/update-item.application';
import { ListItemDtoInput, ListItemDtoOutput } from '../dto/list-item.dto';
import { ListItemApplication } from 'src/application/items/list-item.application';
import { FindByIdItemApplication } from 'src/application/items/find-by-id-item.application';

@Controller({
  path: 'items',
})
@ApiTags('item')
export class ItemController {
  constructor(
    @Inject(AddItemApplication)
    private addItemApplication: AddItemApplication,
    @Inject(RemoveItemApplication)
    private removeItemApplication: RemoveItemApplication,
    @Inject(UpdateItemApplication)
    private updateItemApplication: UpdateItemApplication,
    @Inject(ListItemApplication)
    private listItemApplication: ListItemApplication,
    @Inject(FindByIdItemApplication)
    private findByIdItemApplication: FindByIdItemApplication,
  ) {}
  @Post('')
  @UseGuards(RolesGuard)
  @Roles(Role.Client)
  @UsePipes(createPipe(AddItemDtoInput))
  @ApiBody({ type: AddItemDtoInput, required: true })
  async addItem(
    @Body()
    input: AddItemDtoInput,
  ): Promise<AddItemDtoOutput> {
    return await this.addItemApplication.execute(input);
  }

  @Get('/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async findById(
    @Param()
    input: FindByIdItemDtoInput,
  ): Promise<Record<string, any>> {
    return await this.findByIdItemApplication.execute(input);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async list(
    @Query()
    input: ListItemDtoInput,
  ): Promise<ListItemDtoOutput> {
    return await this.listItemApplication.execute(input);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Client)
  @UsePipes(createPipe(RemoveItemDtoInput))
  @ApiBody({ type: RemoveItemDtoInput, required: true })
  async delteItem(
    @Param()
    input: RemoveItemDtoInput,
  ): Promise<RemoveItemDtoOutput> {
    return await this.removeItemApplication.execute(input);
  }

  @Patch('/:id')
  @Roles(Role.Client)
  @UseGuards(RolesGuard)
  async update(
    @Param()
    id: FindByIdItemDtoInput,
    @Body()
    input: UpdateItemDtoInput,
  ): Promise<Record<string, any>> {
    return await this.updateItemApplication.execute(id, input);
  }
}
