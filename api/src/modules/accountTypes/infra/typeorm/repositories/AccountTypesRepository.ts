import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountTypeDTO,
  IAccountTypesRepository,
} from '@modules/accountTypes/domain/repositories/IAccountTypesRepository';
import { IAccountType } from '@modules/accountTypes/domain/entities/IAccountType';
import { AccountType } from '../entities/AccountType';

export class AccountTypesRepository implements IAccountTypesRepository {
  private repository: Repository<IAccountType>;

  constructor() {
    this.repository = dataSource.getRepository(AccountType);
  }

  async create({ type }: CreateAccountTypeDTO): Promise<IAccountType> {
    const accountType = await this.repository.create({
      type,
    });
    return this.repository.save(accountType);
  }

  async findByType(type: string): Promise<IAccountType | null> {
    return this.repository.findOneBy({ type });
  }

  async save(accountType: IAccountType): Promise<IAccountType> {
    return this.repository.save(accountType);
  }
}
