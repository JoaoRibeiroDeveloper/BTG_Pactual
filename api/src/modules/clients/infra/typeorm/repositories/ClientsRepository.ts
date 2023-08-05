import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import {
  CreateClientDTO,
  IClientsRepository,
} from '@modules/clients/domain/repositories/IClientsRepository';
import { IClient } from '@modules/clients/domain/entities/IClient';
import { Client } from '../entities/Client';

export class ClientsRepository implements IClientsRepository {
  private repository: Repository<IClient>;

  constructor() {
    this.repository = dataSource.getRepository(Client);
  }

  async create({
    name,
    cpf,
    password,
    birthDate,
  }: CreateClientDTO): Promise<IClient> {
    const client = await this.repository.create({
      name,
      cpf,
      password,
      birthDate,
    });
    return this.repository.save(client);
  }

  async findByCPF(cpf: string): Promise<IClient | null> {
    return this.repository.findOneBy({ cpf });
  }
  findById(id: number): Promise<IClient> {
    return this.repository.findOneBy({ id });
  }
  async save(client: IClient): Promise<IClient> {
    return this.repository.save(client);
  }
}
