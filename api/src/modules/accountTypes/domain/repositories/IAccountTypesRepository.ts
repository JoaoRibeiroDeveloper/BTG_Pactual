import { IAccountType } from '../entities/IAccountType';

export type CreateAccountTypeDTO = {
  type: string;
};

export interface IAccountTypesRepository {
  create({ type }: CreateAccountTypeDTO): Promise<IAccountType>;
  findByType(type: string): Promise<IAccountType | null>;
  save(accountType: IAccountType): Promise<IAccountType>;
}
