import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRunUpdatedAtFunction1691056470468
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION run_updated_at()
        RETURNS TRIGGER AS
        $$
        BEGIN
            NEW.updated_at := CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$
        LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FUNCTION run_updated_at`);
  }
}
