import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Agency } from '../entities/Agencies';
import {
  CreateAgencyDTO,
  IAgenciesRepository,
} from '@modules/agencies/domain/repositories/IAgenciesRepository';
import { IAgency } from '@modules/agencies/domain/entities/IAgency';

export class AgenciesRepository implements IAgenciesRepository {
  private repository: Repository<IAgency>;

  constructor() {
    this.repository = dataSource.getRepository(Agency);
  }

  async create({ name, cod_bank, bank }: CreateAgencyDTO): Promise<IAgency> {
    const agency = await this.repository.create({ name, cod_bank, bank });
    return this.repository.save(agency);
  }

  async findByName(name: string): Promise<IAgency | null> {
    return this.repository.findOneBy({ name });
  }

  async save(agency: IAgency): Promise<IAgency> {
    return this.repository.save(agency);
  }
}
