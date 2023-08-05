import { IAccountType } from '@modules/accountTypes/domain/entities/IAccountType';
import { AccountType } from '@modules/accountTypes/infra/typeorm/entities/AccountType';
import { IAccount } from '@modules/accounts/domain/entities/IAccount';
import { IAgency } from '@modules/agencies/domain/entities/IAgency';
import { Agency } from '@modules/agencies/infra/typeorm/entities/Agencies';
import { IClient } from '@modules/clients/domain/entities/IClient';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IMovement } from '@modules/movements/domain/entities/IMovement';
import { Movement } from '@modules/movements/infra/typeorm/entities/Movement';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Account implements IAccount {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @OneToMany(() => Client, client => client.account)
  @JoinColumn({ name: 'client_id' })
  client: IClient;

  @Column({ length: 9, unique: true })
  account_number: string;

  @Column({ type: 'float' })
  balance: number;

  @ManyToOne(() => Agency, agency => agency.account)
  @JoinColumn({ name: 'agency_id' })
  agency: IAgency;

  @ManyToOne(() => AccountType, accountType => accountType.account)
  @JoinColumn({ name: 'account_type_id' })
  accountType: IAccountType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Movement, movement => movement.account)
  movement: IMovement[];
}
