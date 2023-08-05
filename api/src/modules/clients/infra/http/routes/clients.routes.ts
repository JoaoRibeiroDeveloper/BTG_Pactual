import { Router } from 'express';
import { container } from 'tsyringe';

import { ClientsValidateRoutes } from './ClientsValidateRoutes';

import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { UpdateClientController } from '@modules/clients/useCases/updateClient/UpdateClientController';
import { SelectUserController } from '@modules/clients/useCases/selectClient/SelectUserController';

const clientsRouter = Router();

const clientsValidateRoutes = container.resolve(ClientsValidateRoutes);

const createClientController = container.resolve(CreateClientController);
const updateClientController = container.resolve(UpdateClientController);
const selectUserController = container.resolve(SelectUserController);

clientsRouter.get('/:id', selectUserController.handle);

clientsRouter.post(
  '/',
  clientsValidateRoutes.create(),
  createClientController.handle,
);

clientsRouter.put(
  '/',
  clientsValidateRoutes.update(),
  updateClientController.handle,
);

export default clientsRouter;
