import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { FindByIdUserUsecaseInput } from '../interfaces/find-by-id.user.usecase.interface';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class FindByIdUserUsecase
  implements IUseCase<FindByIdUserUsecaseInput, UserEntity>
{
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}
  async execute(input: FindByIdUserUsecaseInput): Promise<UserEntity> {
    const user = await this._userRepository.findOne(input);
    return user;
  }
}
