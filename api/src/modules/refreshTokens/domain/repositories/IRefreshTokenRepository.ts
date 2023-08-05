import { IClient } from '@modules/clients/domain/entities/IClient';
import { IRefreshToken } from '../entities/IRefreshToken';

export type CreateRefreshTokenDTO = {
  token: string;
  client: IClient;
  expires: Date;
  valid?: boolean;
};

export interface IRefreshTokenRepository {
  create({
    token,
    client,
    expires,
    valid,
  }: CreateRefreshTokenDTO): Promise<IRefreshToken>;
  findById(id: number): Promise<IRefreshToken>;
  findByToken(token: string): Promise<IRefreshToken>;
  save(refreshToken: IRefreshToken): Promise<IRefreshToken>;
}
