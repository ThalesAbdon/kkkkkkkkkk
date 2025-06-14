export interface CreateClientUsecaseInput {
  fullName: string;
  contact: string;
  address: string;
  userId: number;
}

export interface CreateClientUsecaseOutput extends CreateClientUsecaseInput {
  id: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
