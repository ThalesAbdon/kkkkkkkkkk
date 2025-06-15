import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { UserRepository } from '../repository/user.repository';
import {
  ListUserUsecaseInput,
  User,
} from '../interfaces/list.user.usecase.interface';
import { UserRole } from 'src/shared/user-role.enum';

@Injectable()
export class ListUserUsecase implements IUseCase<ListUserUsecaseInput, User[]> {
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}

  async execute(input: ListUserUsecaseInput): Promise<User[]> {
    const users = await this._userRepository.findManyByFilters(input);

    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type as UserRole,
      emailVerified: user.email_verified,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }));
  }
}
