import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import {
  CreateMovementTypeDTO,
  IMovementTypesRepository,
} from '@modules/movementTypes/domain/repositories/IMovementTypesRepository';
import { IMovementType } from '@modules/movementTypes/domain/entities/IMovementType';
import { MovementType } from '../entities/MovementType';

export class MovementTypesRepository implements IMovementTypesRepository {
  private repository: Repository<IMovementType>;

  constructor() {
    this.repository = dataSource.getRepository(MovementType);
  }

  async create({ type }: CreateMovementTypeDTO): Promise<IMovementType> {
    const movementType = await this.repository.create({ type });
    return this.repository.save(movementType);
  }

  async findByType(type: string): Promise<IMovementType | null> {
    return this.repository.findOneBy({ type });
  }

  async save(movementType: IMovementType): Promise<IMovementType> {
    return this.repository.save(movementType);
  }
}
