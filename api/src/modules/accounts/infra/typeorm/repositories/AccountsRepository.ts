import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/Account';
import { IAccount } from '@modules/accounts/domain/entities/IAccount';
import {
  CreateAccountDTO,
  IAccountsRepository,
} from '@modules/accounts/domain/repositories/IAccountsRepository';

export class AccountsRepository implements IAccountsRepository {
  private repository: Repository<IAccount>;

  constructor() {
    this.repository = dataSource.getRepository(Account);
  }

  async create({
    client,
    account_number,
    balance,
    agency,
    accountType,
  }: CreateAccountDTO): Promise<IAccount> {
    const account = await this.repository.create({
      client,
      account_number,
      balance,
      agency,
      accountType,
    });
    return this.repository.save(account);
  }

  async findByAccountNumber(account_number: string): Promise<IAccount | null> {
    return this.repository.findOneBy({ account_number });
  }

  async save(account: IAccount): Promise<IAccount> {
    return this.repository.save(account);
  }
}
