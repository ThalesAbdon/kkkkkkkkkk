import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginUserUsecase } from 'src/core/users/usecases/login-user.usecase';
import { Bcrypt } from 'src/presentation/guard/bcrypt';
import { AuthService } from 'src/presentation/guard/auth.service';
import { LoginUserApplicationInput } from './interfaces/login-user.application.interface';

@Injectable()
export class LoginUserApplication {
  constructor(
    @Inject(LoginUserUsecase) private loginUserUseCase: LoginUserUsecase,
    @Inject(Bcrypt) private bcrypt: Bcrypt,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}
  async execute(
    input: LoginUserApplicationInput,
  ): Promise<Record<string, any>> {
    try {
      const user = await this.loginUserUseCase.execute(input);
      const hashPassword = await this.bcrypt.compare(
        input.password,
        user?.password,
      );
      if (!hashPassword) {
        throw new Error('Email or Password incorrect!');
      }
      const token = await this.authService.createToken({ user });
      return { token: token };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
