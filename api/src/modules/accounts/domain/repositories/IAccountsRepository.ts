import { IAgency } from '@modules/agencies/domain/entities/IAgency';
import { IAccount } from '../entities/IAccount';
import { IAccountType } from '@modules/accountTypes/domain/entities/IAccountType';
import { IClient } from '@modules/clients/domain/entities/IClient';

export type CreateAccountDTO = {
  client: IClient;
  account_number: string;
  balance: number;
  agency: IAgency;
  accountType: IAccountType;
};

export interface IAccountsRepository {
  create({
    client,
    account_number,
    balance,
    agency,
    accountType,
  }: CreateAccountDTO): Promise<IAccount>;
  findByAccountNumber(account_number: string): Promise<IAccount | null>;
  save(account: IAccount): Promise<IAccount>;
}
