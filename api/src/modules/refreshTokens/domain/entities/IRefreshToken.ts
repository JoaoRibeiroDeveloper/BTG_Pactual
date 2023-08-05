import { IClient } from '@modules/clients/domain/entities/IClient';

export interface IRefreshToken {
  id: number;
  client: IClient;
  token: string;
  valid: boolean;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}
