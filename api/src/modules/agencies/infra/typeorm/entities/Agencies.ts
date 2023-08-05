import { IAccount } from '@modules/accounts/domain/entities/IAccount';
import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { IAgency } from '@modules/agencies/domain/entities/IAgency';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('agencies')
export class Agency implements IAgency {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ length: 5, unique: true })
  name: string;

  @Column()
  cod_bank: number;

  @Column({ length: 255 })
  bank: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Account, account => account.agency)
  account: IAccount[];
}
