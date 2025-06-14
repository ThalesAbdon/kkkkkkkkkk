import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { ClientRepository } from '../repository/client.repository';
import { Client } from 'src/application/clients/interfaces/list-client.application.interface';
import { ListClientUsecaseInput } from '../interfaces/list.client.usecase.interface';

@Injectable()
export class ListClientUsecase
  implements IUseCase<ListClientUsecaseInput, Client[]>
{
  constructor(
    @Inject(ClientRepository)
    private readonly _clientRepository: ClientRepository,
  ) {}

  async execute(input: ListClientUsecaseInput): Promise<Client[]> {
    const clients = await this._clientRepository.findMany(input);

    return clients.map(client => ({
      id: client.id,
      userId: client.user_id,
      fullName: client.full_name,
      contact: client.contact,
      address: client.address,
      status: client.status,
      createdAt: client.created_at,
      updatedAt: client.updated_at,
    }));
  }
}
