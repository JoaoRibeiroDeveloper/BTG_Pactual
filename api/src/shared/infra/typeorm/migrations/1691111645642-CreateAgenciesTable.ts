import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAgenciesTable1691111645642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE agencies(
        id SERIAL PRIMARY KEY,
        name CHAR(5) UNIQUE NOT NULL,
        cod_bank INTEGER NOT NULL,
        BANK VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_agencies
      BEFORE UPDATE ON
        agencies
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_agencies ON agencies`,
    );
    await queryRunner.query(`DROP TABLE agencies`);
  }
}
