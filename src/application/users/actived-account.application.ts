import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ActivedAccountUsecase } from 'src/core/users/usecases/actived-account.usecase';
import { ActivedAccountApplicationInput } from './interfaces/actived-account.application.interface';
import { AuthService } from 'src/presentation/guard/auth.service';

@Injectable()
export class ActivedAccountApplication {
  constructor(
    @Inject(ActivedAccountUsecase)
    private activedAccountUseCase: ActivedAccountUsecase,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  async execute(input: ActivedAccountApplicationInput): Promise<void> {
    try {
      const decoded = await this.authService.checkToken(input.token);
      if (!decoded.user?.id) {
        throw new BadRequestException('Invalid Token!');
      }
      await this.activedAccountUseCase.execute({ id: decoded.user.id });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
