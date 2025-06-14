import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { FindByIdClientUsecaseInput } from '../interfaces/find-by-id.client.usecase.interface';
import { ClientEntity } from '../entity/client.entity';
import { ClientRepository } from '../repository/client.repository';

@Injectable()
export class FindByIdClientUsecase
  implements IUseCase<FindByIdClientUsecaseInput, ClientEntity | null>
{
  constructor(
    @Inject(ClientRepository)
    private readonly _clientRepository: ClientRepository,
  ) {}

  async execute(input: FindByIdClientUsecaseInput): Promise<ClientEntity | null> {
    const client = await this._clientRepository.findOne(input);
    if (!client) {
      return null;
    }

    return new ClientEntity({
      id: client.id,
      userId: client.user_id,
      fullName: client.full_name,
      contact: client.contact,
      address: client.address,
      status: client.status,
      createdAt: client.created_at,
      updatedAt: client.updated_at,
    });
  }
}
