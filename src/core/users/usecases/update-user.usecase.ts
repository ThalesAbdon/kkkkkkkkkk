import { Inject, Injectable } from '@nestjs/common';
import {
  UpdateUserUsecaseInput,
  UpdateUserUsecaseOutput,
} from '../interfaces/update.user.usecase.interface';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdateUserUsecase
  implements IUseCase<UpdateUserUsecaseInput, UpdateUserUsecaseOutput>
{
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}
  async execute(
    input: UpdateUserUsecaseInput & { id: number },
  ): Promise<UpdateUserUsecaseOutput> {
    const id = input.id;
    delete input.id;
    return await this._userRepository.update(id, input);
  }
}
