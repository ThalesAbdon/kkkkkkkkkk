export interface ListClientApplicationInput {
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

export interface ListClientApplicationOutput {
  clients: Client[];
}
