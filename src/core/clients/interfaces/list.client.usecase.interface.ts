export interface ListClientUsecaseInput {
  fullName?: string;
  contact?: string;
  address?: string;
}

export interface Client {
  id: number;
  fullName: string;
  contact: string;
  address: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
