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
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateUserApplication } from 'src/application/users/create-user.application';
import { CreateUserDtoInput, CreateUserDtoOutput } from '../dto/create.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { createPipe } from 'src/shared/utils/create-pipe';
import { ActivedAccountDtoInput } from '../dto/actived-account.dto';
import { ActivedAccountApplication } from 'src/application/users/actived-account.application';
import { Roles } from 'src/presentation/roles.decorator';
import { Role } from 'src/presentation/enum/role.enum';
import { RolesGuard } from 'src/presentation/guard/roles.guard';
import { LoginUserDtoInput } from '../dto/login.dto';
import { LoginUserApplication } from 'src/application/users/login-user.application';
import { DeleteUserDtoInput } from '../dto/delete.dto';
import { FindByIdDtoInput } from '../dto/find-by-id-user.dto';
import { FindByIdUserApplication } from 'src/application/users/find-by-id-user.application';
import { DeleteUserApplication } from 'src/application/users/delete-user.application';
import { UpdateUserDtoInput } from '../dto/update.dto';
import { UpdateUserApplication } from 'src/application/users/update-user.application';
import { ListUserDtoInput, ListUserDtoOutput } from '../dto/list.dto';
import { ListUserApplication } from 'src/application/users/list-user.application';
import { UserRole } from 'src/shared/user-role.enum';
import { Request } from 'express';

@Controller({
  path: 'users',
})
@ApiTags('user')
export class UserController {
  constructor(
    @Inject(CreateUserApplication)
    private createUserApplication: CreateUserApplication,
    @Inject(ActivedAccountApplication)
    private activedAccountApplication: ActivedAccountApplication,
    @Inject(LoginUserApplication)
    private loginUserApplication: LoginUserApplication,
    @Inject(DeleteUserApplication)
    private deleteUserApplication: DeleteUserApplication,
    @Inject(FindByIdUserApplication)
    private findByIdUserApplication: FindByIdUserApplication,
    @Inject(UpdateUserApplication)
    private updateUserApplication: UpdateUserApplication,
    @Inject(ListUserApplication)
    private listUserApplication: ListUserApplication,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/admin')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UsePipes(createPipe(CreateUserDtoInput))
  @ApiBody({ type: CreateUserDtoInput, required: true })
  async createAdmin(
    @Req()
    req: Request,
    @Body()
    input: CreateUserDtoInput,
  ): Promise<CreateUserDtoOutput> {
    const type = { type: UserRole.ADMIN };
    const combined = { ...input, ...type };
    return await this.createUserApplication.execute(combined, req);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/client')
  @UsePipes(createPipe(CreateUserDtoInput))
  @ApiBody({ type: CreateUserDtoInput, required: true })
  async createClient(
    @Req()
    req: Request,
    @Body()
    input: CreateUserDtoInput,
  ): Promise<CreateUserDtoOutput> {
    const type = { type: UserRole.CLIENT };
    const combined = { ...input, ...type };
    return await this.createUserApplication.execute(combined, req);
  }

  @Post('/login')
  @UsePipes(createPipe(LoginUserDtoInput))
  @ApiBody({ type: LoginUserDtoInput, required: true })
  async login(
    @Body()
    input: LoginUserDtoInput,
  ): Promise<Record<string, any>> {
    return await this.loginUserApplication.execute(input);
  }

  @Get('/:id/:token')
  async activeAccount(
    @Param()
    input: ActivedAccountDtoInput,
  ): Promise<void> {
    await this.activedAccountApplication.execute(input);
  }

  @Get('/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async findById(
    @Param()
    input: FindByIdDtoInput,
  ): Promise<Record<string, any>> {
    return await this.findByIdUserApplication.execute(input);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async list(
    @Query()
    input: ListUserDtoInput,
  ): Promise<ListUserDtoOutput> {
    return await this.listUserApplication.execute(input);
  }

  @Patch('/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async update(
    @Param()
    id: FindByIdDtoInput,
    @Body()
    input: UpdateUserDtoInput,
  ): Promise<Record<string, any>> {
    return await this.updateUserApplication.execute(id, input);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async deleteUser(
    @Param()
    input: DeleteUserDtoInput,
  ): Promise<Record<string, any>> {
    return await this.deleteUserApplication.execute(input);
  }
}
