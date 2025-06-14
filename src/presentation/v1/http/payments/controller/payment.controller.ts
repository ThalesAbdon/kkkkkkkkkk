import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PaymentApplication } from 'src/application/payments/payment.application';
import { Role } from 'src/presentation/enum/role.enum';
import { RolesGuard } from 'src/presentation/guard/roles.guard';
import { Roles } from 'src/presentation/roles.decorator';
import { createPipe } from 'src/shared/utils/create-pipe';
import { PaymentDtoInput } from '../dto/payment.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'payments',
})
@ApiTags('payment')
export class PaymentController {
  constructor(
    @Inject(PaymentApplication)
    private readonly paymentApplication: PaymentApplication,
  ) {}

  @Post('process-payment')
  @UseGuards(RolesGuard)
  @Roles(Role.Client)
  @UsePipes(createPipe(PaymentDtoInput))
  async processPayment(
    @Body() input: PaymentDtoInput,
  ): Promise<{ success: boolean; message: string }> {
    return this.paymentApplication.execute(input);
  }
}
