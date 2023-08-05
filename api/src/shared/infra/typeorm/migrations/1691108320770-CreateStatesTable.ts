import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatesTable1691108320770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE states(
        cod CHAR(2) PRIMARY KEY,
        abbreviation_uf CHAR(2) UNIQUE NOT NULL,
        uf VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_states
      BEFORE UPDATE ON
        states
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_states ON states`,
    );
    await queryRunner.query(`DROP TABLE states`);
  }
}
