import { IMovementType } from '../entities/IMovementType';

export type CreateMovementTypeDTO = {
  type: string;
};

export interface IMovementTypesRepository {
  create({ type }: CreateMovementTypeDTO): Promise<IMovementType>;
  findByType(type: string): Promise<IMovementType | null>;
  save(MovementType: IMovementType): Promise<IMovementType>;
}
