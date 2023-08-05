import { container } from 'tsyringe';

import { IMovementTypesRepository } from '../domain/repositories/IMovementTypesRepository';
import { MovementTypesRepository } from '../infra/typeorm/repositories/MovementTypesRepository';

container.registerSingleton<IMovementTypesRepository>(
  'MovementTypesRepository',
  MovementTypesRepository,
);
