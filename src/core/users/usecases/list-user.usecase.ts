import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { UserRepository } from '../repository/user.repository';
import {
  ListUserUsecaseInput,
  User,
} from '../interfaces/list.user.usecase.interface';

@Injectable()
export class ListUserUsecase implements IUseCase<ListUserUsecaseInput, User[]> {
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}
  async execute(input: ListUserUsecaseInput): Promise<User[]> {
    return await this._userRepository.get(input);
  }
}
