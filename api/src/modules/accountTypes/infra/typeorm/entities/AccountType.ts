import { IAccountType } from '@modules/accountTypes/domain/entities/IAccountType';
import { IAccount } from '@modules/accounts/domain/entities/IAccount';
import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('account_types')
export class AccountType implements IAccountType {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ length: 255, unique: true })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Account, account => account.client)
  account: IAccount[];
}
