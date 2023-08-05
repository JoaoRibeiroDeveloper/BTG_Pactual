import { container } from 'tsyringe';

import { MovementsRepository } from '../infra/typeorm/repositories/MovementsRepository';
import { IMovementsRepository } from '../domain/repositories/IMovementsRepository';

container.registerSingleton<IMovementsRepository>(
  'MovementsRepository',
  MovementsRepository,
);
