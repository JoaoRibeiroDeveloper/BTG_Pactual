import { IAccountType } from '@modules/accountTypes/domain/entities/IAccountType';
import { IAgency } from '@modules/agencies/domain/entities/IAgency';
import { IClient } from '@modules/clients/domain/entities/IClient';

export interface IAccount {
  id: number;
  client: IClient;
  account_number: string;
  balance: number;
  agency: IAgency;
  accountType: IAccountType;
  createdAt: Date;
  updatedAt: Date;
}
