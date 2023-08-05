import { IRefreshToken } from '@modules/refreshTokens/domain/entities/IRefreshToken';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/RefreshToken';
import {
  CreateRefreshTokenDTO,
  IRefreshTokenRepository,
} from '@modules/refreshTokens/domain/repositories/IRefreshTokenRepository';

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private repository: Repository<IRefreshToken>;
  constructor() {
    this.repository = dataSource.getRepository(RefreshToken);
  }
  create({
    token,
    client,
    expires,
    valid = true,
  }: CreateRefreshTokenDTO): Promise<IRefreshToken> {
    const refreshToken = this.repository.create({
      token,
      client,
      expires,
      valid,
    });
    return this.repository.save(refreshToken);
  }
  findById(id: number): Promise<IRefreshToken> {
    return this.repository.findOneBy({ id });
  }
  findByToken(token: string): Promise<IRefreshToken> {
    return this.repository.findOneBy({ token });
  }
  save(refreshToken: IRefreshToken): Promise<IRefreshToken> {
    return this.repository.save(refreshToken);
  }
}
