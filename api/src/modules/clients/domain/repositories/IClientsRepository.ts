import { IClient } from '../entities/IClient';

export type CreateClientDTO = {
  name: string;
  cpf: string;
  password: string;
  birthDate: Date;
};

export type UpdateClientDTO = {
  id: number;
  name: string;
  cpf: string;
  password?: string;
  birthDate: Date;
};

export type createLoginDTO = {
  cpf: string;
  password: string;
};

export type ResponseCreateLogin = {
  client: IClient;
  accessToken: string;
  refreshToken: string;
};

export interface IClientsRepository {
  create({ name, cpf, password, birthDate }: CreateClientDTO): Promise<IClient>;
  findByCPF(cpf: string): Promise<IClient | null>;
  findById(id: number): Promise<IClient | null>;
  save(client: IClient): Promise<IClient>;
}
