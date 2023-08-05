import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchoolingTable1691105215771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE schooling(
        id SERIAL PRIMARY KEY,
        level VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_schooling
      BEFORE UPDATE ON
        schooling
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_schooling ON schooling`,
    );
    await queryRunner.query(`DROP TABLE schooling`);
  }
}
