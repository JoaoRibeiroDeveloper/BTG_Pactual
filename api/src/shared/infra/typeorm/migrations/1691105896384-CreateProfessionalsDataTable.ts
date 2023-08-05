import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfessionalsDataTable1691105896384
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE professionals_data(
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL,
        profession VARCHAR(255) NOT NULL,
        monthly_income NUMERIC(15, 2) CHECK (monthly_income >= 0) NOT NULL,
        patrimony NUMERIC(15, 2) CHECK (patrimony >= 0) NOT NULL,
        schooling_id INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_professionals_data
      BEFORE UPDATE ON
        professionals_data
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
    await queryRunner.query(`
      ALTER TABLE
        professionals_data
      ADD CONSTRAINT
        FK_PROFESSIONALS_DATA_CLIENTS_ID
      FOREIGN KEY
        (client_id)
      REFERENCES
        clients(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
      ALTER TABLE
        professionals_data
      ADD CONSTRAINT
        FK_PROFESSIONALS_DATA_SCHOOLING_ID
      FOREIGN KEY
        (schooling_id)
      REFERENCES
        schooling(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE professionals_data DROP CONSTRAINT FK_PROFESSIONALS_DATA_SCHOOLING_ID;
    `);
    await queryRunner.query(`
      ALTER TABLE professionals_data DROP CONSTRAINT FK_PROFESSIONALS_DATA_CLIENTS_ID;
    `);
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_professionals_data ON professionals_data`,
    );
    await queryRunner.query(`DROP TABLE professionals_data`);
  }
}
