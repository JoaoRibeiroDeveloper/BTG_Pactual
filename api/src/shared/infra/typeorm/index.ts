import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { CreateRunUpdatedAtFunction1691056470468 } from './migrations/1691056470468-CreateRunUpdatedAtFunction';
import { CreateClientsTable1691096212322 } from './migrations/1691096212322-CreateClientsTable';
import { CreateDocumentsTypesTable1691099736054 } from './migrations/1691099736054-CreateDocumentsTypesTable';
import { CreateDocumentsTable1691102574418 } from './migrations/1691102574418-CreateDocumentsTable';
import { CreateSchoolingTable1691105215771 } from './migrations/1691105215771-CreateSchoolingTable';
import { CreateProfessionalsDataTable1691105896384 } from './migrations/1691105896384-CreateProfessionalsDataTable';
import { CreateContactsTable1691107584763 } from './migrations/1691107584763-CreateContactsTable';
import { CreateStatesTable1691108320770 } from './migrations/1691108320770-CreateStatesTable';
import { CreateCitiesTable1691108711427 } from './migrations/1691108711427-CreateCitiesTable';
import { CreateAddressTable1691110128183 } from './migrations/1691110128183-CreateAddressTable';
import { CreateMovementTypesTable1691111088375 } from './migrations/1691111088375-CreateMovementTypesTable';
import { CreateAgenciesTable1691111645642 } from './migrations/1691111645642-CreateAgenciesTable';
import { CreateAccountTypesTable1691112287108 } from './migrations/1691112287108-CreateAccountTypesTable';
import { CreateAccountsTable1691112589866 } from './migrations/1691112589866-CreateAccountsTable';
import { CreateMovementsTable1691113594883 } from './migrations/1691113594883-CreateMovementsTable';
import { CreateRefreshTokensTable1691114186536 } from './migrations/1691114186536-CreateRefreshTokensTable';

import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { AccountType } from '@modules/accountTypes/infra/typeorm/entities/AccountType';
import { Agency } from '@modules/agencies/infra/typeorm/entities/Agencies';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { Movement } from '@modules/movements/infra/typeorm/entities/Movement';
import { MovementType } from '@modules/movementTypes/infra/typeorm/entities/MovementType';
import { RefreshToken } from '@modules/refreshTokens/infra/typeorm/entities/RefreshToken';

const port = process.env.DB_PORT as unknown as number;

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Account,
    AccountType,
    Agency,
    Client,
    Movement,
    MovementType,
    RefreshToken,
  ],
  migrations: [
    CreateRunUpdatedAtFunction1691056470468,
    CreateClientsTable1691096212322,
    CreateDocumentsTypesTable1691099736054,
    CreateDocumentsTable1691102574418,
    CreateSchoolingTable1691105215771,
    CreateProfessionalsDataTable1691105896384,
    CreateContactsTable1691107584763,
    CreateStatesTable1691108320770,
    CreateCitiesTable1691108711427,
    CreateAddressTable1691110128183,
    CreateMovementTypesTable1691111088375,
    CreateAgenciesTable1691111645642,
    CreateAccountTypesTable1691112287108,
    CreateAccountsTable1691112589866,
    CreateMovementsTable1691113594883,
    CreateRefreshTokensTable1691114186536,
  ],
});
