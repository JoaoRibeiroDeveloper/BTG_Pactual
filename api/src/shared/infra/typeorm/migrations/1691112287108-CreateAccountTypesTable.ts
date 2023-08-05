import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountTypesTable1691112287108
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE account_types(
        id SERIAL PRIMARY KEY,
        type VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_account_types
      BEFORE UPDATE ON
        account_types
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_account_types ON account_types`,
    );
    await queryRunner.query(`DROP TABLE account_types`);
  }
}
