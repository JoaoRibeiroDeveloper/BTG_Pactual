import { IAccount } from '@modules/accounts/domain/entities/IAccount';
import { IMovement } from '../entities/IMovement';
import { IMovementType } from '@modules/movementTypes/domain/entities/IMovementType';

export type CreateMovementDTO = {
  account: IAccount;
  movementType: IMovementType;
  value: number;
};

export interface IMovementsRepository {
  create({
    account,
    movementType,
    value,
  }: CreateMovementDTO): Promise<IMovement>;
  findByAccount(account: IAccount): Promise<IMovement | null>;
  save(movement: IMovement): Promise<IMovement>;
}
