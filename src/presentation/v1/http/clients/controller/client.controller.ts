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
import {
  CreateClientDtoInput,
  CreateClientDtoOutput,
} from '../dto/create-client.dto';
import { createPipe } from 'src/shared/utils/create-pipe';
import { CreateClientApplication } from 'src/application/clients/create-client.application';
import { Roles } from 'src/presentation/roles.decorator';
import { Role } from 'src/presentation/enum/role.enum';
import { RolesGuard } from 'src/presentation/guard/roles.guard';
import { FindByIdClientDtoInput } from '../dto/find-by-id-client.dto';
import {
  UpdateClientDtoInput,
  UpdateClientDtoOutput,
} from '../dto/update-client.dto';
import { UpdateClientApplication } from 'src/application/clients/update-client.application';
import { FindByIdClientApplication } from 'src/application/clients/find-by-id-client.application';
import { DeleteClientDtoInput } from '../dto/delete-client.dto';
import { DeleteClientApplication } from 'src/application/clients/delete-client.application';
import { ListClientApplication } from 'src/application/clients/list-client.application';
import {
  ListClientDtoInput,
  ListClientDtoOutput,
} from '../dto/list-client.dto';
import { HttpContext } from 'src/presentation/guard/http.context';
import { ClientUserHttpDtoInput } from '../dto/user-http-context.dto';

@Controller({
  path: 'clients',
})
@ApiTags('clients')
export class ClientController {
  constructor(
    @Inject(CreateClientApplication)
    private createClientApplication: CreateClientApplication,
    @Inject(UpdateClientApplication)
    private updateClientApplication: UpdateClientApplication,
    @Inject(FindByIdClientApplication)
    private findByIdClientApplication: FindByIdClientApplication,
    @Inject(DeleteClientApplication)
    private deleteClientApplication: DeleteClientApplication,
    @Inject(ListClientApplication)
    private listClientApplication: ListClientApplication,
    @Inject(HttpContext) protected readonly httpContext: HttpContext,
  ) {}

  @Post('')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Client)
  @UsePipes(createPipe(CreateClientDtoInput))
  @ApiBody({ type: CreateClientDtoInput, required: true })
  async create(
    @Req()
    request: any,
    @Body()
    input: CreateClientDtoInput,
  ): Promise<CreateClientDtoOutput> {
    const user: ClientUserHttpDtoInput = request?.user;
    return await this.createClientApplication.execute(input, user);
  }

  @Get('/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async findById(
    @Param()
    input: FindByIdClientDtoInput,
  ): Promise<Record<string, any>> {
    return await this.findByIdClientApplication.execute(input);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async list(
    @Query()
    input: ListClientDtoInput,
  ): Promise<ListClientDtoOutput> {
    return await this.listClientApplication.execute(input);
  }

  @Patch('/:id')
  @Roles(Role.Client, Role.Admin)
  @UseGuards(RolesGuard)
  async update(
    @Param()
    id: FindByIdClientDtoInput,
    @Body()
    input: UpdateClientDtoInput,
  ): Promise<UpdateClientDtoOutput> {
    return await this.updateClientApplication.execute(id, input);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async deleteClient(
    @Param()
    input: DeleteClientDtoInput,
  ): Promise<Record<string, any>> {
    return await this.deleteClientApplication.execute(input);
  }
}
