import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IClientsRepository } from '@modules/clients/domain/repositories/IClientsRepository';
import { IClient } from '@modules/clients/domain/entities/IClient';

@injectable()
export class SelectUserUseCase {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}
  async execute(id: number): Promise<IClient> {
    const client = await this.clientsRepository.findById(id);
    if (!client) {
      throw new AppError('Client not found', 404);
    }
    return client;
  }
}
