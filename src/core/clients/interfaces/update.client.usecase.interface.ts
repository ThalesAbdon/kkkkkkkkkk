export interface UpdateClientUsecaseInput {
  fullName?: string;
  contact?: string;
  address?: string;
  status?: boolean;
}

export interface UpdateClientUsecaseOutput extends UpdateClientUsecaseInput {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
