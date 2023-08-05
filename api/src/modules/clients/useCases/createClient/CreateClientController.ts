import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateClientUseCase } from './CreateClientUseCase';
import { instanceToInstance } from 'class-transformer';

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createClientUseCase = container.resolve(CreateClientUseCase);
    const { name, cpf, password, birthDate } = request.body;
    const client = await createClientUseCase.execute({
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
