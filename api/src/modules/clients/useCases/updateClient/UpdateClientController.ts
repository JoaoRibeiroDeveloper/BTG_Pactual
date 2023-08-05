import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateClientUseCase } from './UpdateClientUseCase';
import { instanceToInstance } from 'class-transformer';

export class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateClientUseCase = container.resolve(UpdateClientUseCase);
    const { id, name, cpf, password = '', birthDate } = request.body;
    const client = await updateClientUseCase.execute({
      id,
      name,
      cpf,
      password,
      birthDate,
    });
    return response.json(
      instanceToInstance({
        client,
      }),
    );
  }
}
