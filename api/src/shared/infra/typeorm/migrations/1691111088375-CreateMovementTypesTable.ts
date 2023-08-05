import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMovementTypesTable1691111088375
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE movement_types(
        id SERIAL PRIMARY KEY,
        type VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_movement_types
      BEFORE UPDATE ON
        movement_types
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_movement_types ON movement_types`,
    );
    await queryRunner.query(`DROP TABLE movement_types`);
  }
}
