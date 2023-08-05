import { IAccount } from '@modules/accounts/domain/entities/IAccount';
import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { IClient } from '@modules/clients/domain/entities/IClient';
import { IRefreshToken } from '@modules/refreshTokens/domain/entities/IRefreshToken';
import { RefreshToken } from '@modules/refreshTokens/infra/typeorm/entities/RefreshToken';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Client implements IClient {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 255 })
  @Exclude()
  password: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.client)
  refreshTokens: IRefreshToken[];

  @OneToMany(() => Account, account => account.client)
  account: IAccount[];
}
