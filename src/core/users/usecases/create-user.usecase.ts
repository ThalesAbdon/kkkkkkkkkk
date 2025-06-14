import { IUseCase } from 'src/core/interfaces/IUsecase';
import {
  CreateUserUsecaseInput,
  CreateUserUsecaseOutput,
} from '../interfaces/create.user.usecase.interface';
import { UserRepository } from '../repository/user.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUsecase
  implements IUseCase<CreateUserUsecaseInput, CreateUserUsecaseOutput>
{
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}
  async execute(
    input: CreateUserUsecaseInput,
  ): Promise<CreateUserUsecaseOutput> {
    return await this._userRepository.create(input);
  }
}
