import { IClient } from '@modules/clients/domain/entities/IClient';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IRefreshToken } from '@modules/refreshTokens/domain/entities/IRefreshToken';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('refresh_tokens')
export class RefreshToken implements IRefreshToken {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @ManyToOne(() => Client, client => client.refreshTokens)
  @JoinColumn({ name: 'client_id' })
  client: IClient;

  @Column({ length: 255 })
  token: string;

  @Column({ default: true })
  valid: boolean;

  @Column()
  expires: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
