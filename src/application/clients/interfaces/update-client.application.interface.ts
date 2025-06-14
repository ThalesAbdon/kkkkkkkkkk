export interface UpdateClientApplicationInput {
  fullName?: string;
  contact?: string;
  address?: string;
  status?: boolean;
}

export interface UpdateClientApplicationOutput {
  message: string;
}
