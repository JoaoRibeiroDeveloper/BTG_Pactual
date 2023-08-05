import { IAccount } from '@modules/accounts/domain/entities/IAccount';
import { IMovementType } from '@modules/movementTypes/domain/entities/IMovementType';

export interface IMovement {
  id: number;
  account: IAccount;
  movementType: IMovementType;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}
