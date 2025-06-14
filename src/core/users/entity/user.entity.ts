import type { User, Client } from '@prisma/client';

export class UserEntity implements Partial<User> {
  id: number;
  name: string;
  email: string;
  password: string;
  type: 'admin' | 'client'; 
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  client?: Client;

  constructor(input: Partial<UserEntity>) {
    Object.assign(this, input);
  }
}
