import { container } from 'tsyringe';

import { IAccountTypesRepository } from '../domain/repositories/IAccountTypesRepository';
import { AccountTypesRepository } from '../infra/typeorm/repositories/AccountTypesRepository';

container.registerSingleton<IAccountTypesRepository>(
  'AccountTypesRepository',
  AccountTypesRepository,
);
