import type { User, Order } from '@prisma/client';

export class ClientEntity {
  id: number;
  userId: number;
  fullName: string;
  contact: string;
  address: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;

  user?: User;
  orders?: Order[];

  constructor(input: Partial<ClientEntity>) {
    Object.assign(this, input);
  }
}
