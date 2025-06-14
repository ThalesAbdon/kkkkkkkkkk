import { UserRole } from 'src/shared/user-role.enum';

export interface ClientUserHttpDtoInput {
  id: number;
  name: string;
  email: string;
  type: UserRole;
  emailVerified: boolean;
  client: { id: number };
}
