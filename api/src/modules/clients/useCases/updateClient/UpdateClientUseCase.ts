import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import {
  IClientsRepository,
  UpdateClientDTO,
} from '@modules/clients/domain/repositories/IClientsRepository';
import { cryptography } from '@config/cryptography';
import { IClient } from '@modules/clients/domain/entities/IClient';
import { validateCPF } from '@utils/validateCPF';
import { validateDate } from '@utils/validateDate';

@injectable()
export class UpdateClientUseCase {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}
  async execute({
    id,
    name,
    cpf,
    password,
    birthDate,
  }: UpdateClientDTO): Promise<IClient> {
    if (!validateCPF(cpf)) {
      throw new AppError('CPF invalid');
    }
    if (!validateDate(birthDate)) {
      throw new AppError('birthDate invalid');
    }
    let client = await this.clientsRepository.findById(id);
    if (!client) {
      throw new AppError('Client not found', 404);
    }
    const clientExist = await this.clientsRepository.findByCPF(cpf);
    if (clientExist && clientExist.id !== id) {
      throw new AppError('Client already exists', 409);
    }
    client.name = name;
    client.cpf = cpf;
    client.birthDate = birthDate;
    if (password) {
      const hashedPassword = await hash(password, cryptography.salt);
      client.password = hashedPassword;
    }
    client = await this.clientsRepository.save(client);
    return client;
  }
}
