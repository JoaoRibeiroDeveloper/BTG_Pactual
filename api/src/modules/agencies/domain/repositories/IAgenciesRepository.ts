import { IAgency } from '../entities/IAgency';

export type CreateAgencyDTO = {
  name: string;
  cod_bank: number;
  bank: string;
};

export interface IAgenciesRepository {
  create({ name, cod_bank, bank }: CreateAgencyDTO): Promise<IAgency>;
  findByName(name: string): Promise<IAgency | null>;
  save(agency: IAgency): Promise<IAgency>;
}
