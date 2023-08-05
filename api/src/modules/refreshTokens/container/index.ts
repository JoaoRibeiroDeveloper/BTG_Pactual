import { container } from 'tsyringe';

import { RefreshTokenRepository } from '../infra/typeorm/repositories/RefreshTokenRepository';
import { IRefreshTokenRepository } from '../domain/repositories/IRefreshTokenRepository';

container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokenRepository',
  RefreshTokenRepository,
);
