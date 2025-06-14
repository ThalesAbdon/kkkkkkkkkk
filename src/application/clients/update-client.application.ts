import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindByIdClientUsecase } from 'src/core/clients/usecases/find-by-id.client.usecase';
import { UpdateClientUsecase } from 'src/core/clients/usecases/update-client.usecase';
import { FindByIdClientApplicationInput } from './interfaces/find-by-id-client.application.interface';
import {
  UpdateClientApplicationInput,
  UpdateClientApplicationOutput,
} from './interfaces/update-client.application.interface';

@Injectable()
export class UpdateClientApplication {
  constructor(
    @Inject(UpdateClientUsecase)
    private updateClientUseCase: UpdateClientUsecase,
    @Inject(FindByIdClientUsecase)
    private findByIdClientUseCase: FindByIdClientUsecase,
  ) {}
  async execute(
    param: FindByIdClientApplicationInput,
    input: UpdateClientApplicationInput,
  ): Promise<UpdateClientApplicationOutput> {
    try {
      const client = await this.findByIdClientUseCase.execute(param);
      if (!client?.id) {
        throw new BadRequestException('Client not found!');
      }
      const keysToCheck = Object.keys(input);
      const isAnyKeyPresent = keysToCheck.some((key) => key in client);
      if (!isAnyKeyPresent)
        throw new BadRequestException('Not field to update');

      await this.updateClientUseCase.execute({ id: client.id, ...input });
      return { message: 'Client updated!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
