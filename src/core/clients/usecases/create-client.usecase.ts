import { Inject, Injectable } from '@nestjs/common';
import {
  CreateClientUsecaseInput,
  CreateClientUsecaseOutput,
} from '../interfaces/create.client.usecase.interface';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { ClientRepository } from '../repository/client.repository';

@Injectable()
export class CreateClientUsecase
  implements IUseCase<CreateClientUsecaseInput, CreateClientUsecaseOutput>
{
  constructor(
    @Inject(ClientRepository)
    private readonly clientRepository: ClientRepository,
  ) {}

  private mapInputToPrismaData(input: CreateClientUsecaseInput) {
    return {
      full_name: input.fullName,
      contact: input.contact,
      address: input.address,
      user_id: input.userId,
      status: true, // valor padrão para status
    };
  }

  async execute(
    input: CreateClientUsecaseInput,
  ): Promise<CreateClientUsecaseOutput> {
    const data = this.mapInputToPrismaData(input);
    const createdClient = await this.clientRepository.create(data);

    return {
      id: createdClient.id,
      fullName: createdClient.full_name,
      contact: createdClient.contact,
      address: createdClient.address,
      userId: createdClient.user_id,
      status: createdClient.status,
      createdAt: createdClient.created_at,
      updatedAt: createdClient.updated_at,
    };
  }
}
