import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Movement } from '../entities/Movement';
import {
  CreateMovementDTO,
  IMovementsRepository,
} from '@modules/movements/domain/repositories/IMovementsRepository';
import { IMovement } from '@modules/movements/domain/entities/IMovement';
import { IAccount } from '@modules/accounts/domain/entities/IAccount';

export class MovementsRepository implements IMovementsRepository {
  private repository: Repository<IMovement>;

  constructor() {
    this.repository = dataSource.getRepository(Movement);
  }

  async create({
    account,
    movementType,
    value,
  }: CreateMovementDTO): Promise<IMovement> {
    const movement = await this.repository.create({
      account,
      movementType,
      value,
    });
    return this.repository.save(movement);
  }

  async findByAccount(account: IAccount): Promise<IMovement | null> {
    return this.repository.findOneBy({ account });
  }

  async save(movement: IMovement): Promise<IMovement> {
    return this.repository.save(movement);
  }
}
