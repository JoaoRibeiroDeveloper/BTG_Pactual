import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCitiesTable1691108711427 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE cities(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cod_ibge CHAR(7) UNIQUE NOT NULL,
        state_cod CHAR(2) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_cities
      BEFORE UPDATE ON
        cities
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
    await queryRunner.query(`
      ALTER TABLE
        cities
      ADD CONSTRAINT
        FK_CITIES_STATES_COD
      FOREIGN KEY
        (state_cod)
      REFERENCES
        states(cod)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE cities DROP CONSTRAINT FK_CITIES_STATES_COD;
    `);
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_cities ON cities`,
    );
    await queryRunner.query(`DROP TABLE cities`);
  }
}
