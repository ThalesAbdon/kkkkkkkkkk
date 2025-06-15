import { UserRole } from 'src/shared/user-role.enum';

export interface CreateUserUsecaseInput {
  name: string;
  email: string;
  password: string;
  type: UserRole;
}

export interface CreateUserUsecaseOutput extends CreateUserUsecaseInput {
  id: number;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
