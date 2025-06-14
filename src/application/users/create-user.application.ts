import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserUsecase } from 'src/core/users/usecases/create-user.usecase';
import {
  CreateUserApplicationInput,
  CreateUserApplicationOutput,
} from './interfaces/create-user.application.interface';
import { VerifyEmailUsecase } from 'src/core/users/usecases/verify-email.usecase';
import { EmailTemplateParams } from 'src/shared/utils/interface/email-template';
import { Bcrypt } from 'src/presentation/guard/bcrypt';
import { AuthService } from 'src/presentation/guard/auth.service';
import { Request } from 'express';
import { SendgridEmailService } from 'src/infra/mail/service/sendgrid-email.service';

@Injectable()
export class CreateUserApplication {
  constructor(
    @Inject(CreateUserUsecase) private createUserUseCase: CreateUserUsecase,
    @Inject(VerifyEmailUsecase) private verifyEmailUsecase: VerifyEmailUsecase,
    @Inject(Bcrypt) private bcrypt: Bcrypt,
    @Inject(SendgridEmailService) private readonly emailService: SendgridEmailService,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}
  async execute(
    input: CreateUserApplicationInput,
    req: Request,
  ): Promise<CreateUserApplicationOutput> {
    try {
      const emailAlreadyRegistered = await this.verifyEmailUsecase.execute({
        email: input.email,
      });
      if (emailAlreadyRegistered) {
        throw new BadRequestException('Email Already Exist!');
      }
      input.password = await this.bcrypt.sign(input.password);
      const user = await this.createUserUseCase.execute(input);
      delete user.password;
      const token = await this.authService.createToken({ user: user });
      const link = `http://${req.headers.host}/users/${user.id}/${token}`;
      const mailData: EmailTemplateParams = {
        to_name: user.name,
        to_email: user.email,
        message: link,
      };
      if (await this.emailService.sendRegisterationEmail(mailData)) {
        return { message: 'you will shortly receive registration email' };
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
