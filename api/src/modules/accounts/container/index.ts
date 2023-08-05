import { container } from 'tsyringe';
import { IAccountsRepository } from '../domain/repositories/IAccountsRepository';
import { AccountsRepository } from '../infra/typeorm/repositories/AccountsRepository';

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);
