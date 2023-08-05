import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import {
  CreateClientDTO,
  IClientsRepository,
} from '@modules/clients/domain/repositories/IClientsRepository';
import { cryptography } from '@config/cryptography';
import { IClient } from '@modules/clients/domain/entities/IClient';
import { validateCPF } from '@utils/validateCPF';
import { validateDate } from '@utils/validateDate';

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}
  async execute({
    name,
    cpf,
    password,
    birthDate,
  }: CreateClientDTO): Promise<IClient> {
    if (!validateCPF(cpf)) {
      throw new AppError('CPF invalid');
    }
    if (!validateDate(birthDate)) {
      throw new AppError('birthDate invalid');
    }
    const clientExist = await this.clientsRepository.findByCPF(cpf);
    if (clientExist) {
      throw new AppError('Client already exists', 409);
    }
    const hashedPassword = await hash(password, cryptography.salt);
    const client = await this.clientsRepository.create({
      name,
      cpf,
      password: hashedPassword,
      birthDate,
    });
    return client;
  }
}
