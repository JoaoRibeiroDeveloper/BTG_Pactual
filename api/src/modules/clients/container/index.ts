import { container } from 'tsyringe';

import { ClientsValidateRoutes } from '../infra/http/routes/ClientsValidateRoutes';

import { CreateClientController } from '../useCases/createClient/CreateClientController';
import { UpdateClientController } from '../useCases/updateClient/UpdateClientController';

import { IClientsRepository } from '../domain/repositories/IClientsRepository';
import { ClientsRepository } from '../infra/typeorm/repositories/ClientsRepository';
import { SelectUserController } from '../useCases/selectClient/SelectUserController';

container.registerSingleton('ClientsValidateRoutes', ClientsValidateRoutes);

container.registerSingleton('CreateClientController', CreateClientController);
container.registerSingleton('UpdateClientController', UpdateClientController);
container.registerSingleton('SelectUserController', SelectUserController);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);
