import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { SelectUserUseCase } from './SelectUserUseCase';

export class SelectUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const selectUserUseCase = container.resolve(SelectUserUseCase);
    const { id } = request.params;
    const client = await selectUserUseCase.execute(Number(id));
    return response.json(
      instanceToInstance({
        client,
      }),
    );
  }
}
