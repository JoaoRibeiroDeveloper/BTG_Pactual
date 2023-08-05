import { IMovementType } from '@modules/movementTypes/domain/entities/IMovementType';
import { IMovement } from '@modules/movements/domain/entities/IMovement';
import { Movement } from '@modules/movements/infra/typeorm/entities/Movement';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movement_types')
export class MovementType implements IMovementType {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ length: 255 })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Movement, Movement => Movement.movementType)
  movement: IMovement[];
}
