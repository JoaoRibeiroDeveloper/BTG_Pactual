import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { IMovementType } from '@modules/movementTypes/domain/entities/IMovementType';
import { MovementType } from '@modules/movementTypes/infra/typeorm/entities/MovementType';
import { IMovement } from '@modules/movements/domain/entities/IMovement';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movements')
export class Movement implements IMovement {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @ManyToOne(() => Account, account => account.movement)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => MovementType, movementType => movementType.movement)
  @JoinColumn({ name: 'movement_type_id' })
  movementType: IMovementType;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'float' })
  value: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
