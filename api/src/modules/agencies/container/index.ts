import { container } from 'tsyringe';

import { IAgenciesRepository } from '../domain/repositories/IAgenciesRepository';
import { AgenciesRepository } from '../infra/typeorm/repositories/AgenciesRepository';

container.registerSingleton<IAgenciesRepository>(
  'AgenciesRepository',
  AgenciesRepository,
);
