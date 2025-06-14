import { IUseCase } from 'src/core/interfaces/IUsecase';
import { CreateUserUsecaseOutput } from '../interfaces/create.user.usecase.interface';
import { UserRepository } from '../repository/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { LoginUserUsecaseInput } from '../interfaces/login.user.usecase.interface';

@Injectable()
export class LoginUserUsecase
  implements IUseCase<LoginUserUsecaseInput, Record<string, any>>
{
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}
  async execute(
    input: LoginUserUsecaseInput,
  ): Promise<CreateUserUsecaseOutput> {
    const user = await this.userRepository.findOne({ email: input.email });
    return user;
  }
}
