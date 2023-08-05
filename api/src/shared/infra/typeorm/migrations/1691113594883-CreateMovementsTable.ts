import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMovementsTable1691113594883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE movements(
        id SERIAL PRIMARY KEY,
        account_id INTEGER NOT NULL,
        movement_type_id INTEGER NOT NULL,
        value NUMERIC(15, 2) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_movements
      BEFORE UPDATE ON
        movements
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
    await queryRunner.query(`
      ALTER TABLE
        movements
      ADD CONSTRAINT
        FK_MOVEMENTS_ACCOUNTS_ID
      FOREIGN KEY
        (account_id)
      REFERENCES
        accounts(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
      ALTER TABLE
        movements
      ADD CONSTRAINT
        FK_MOVEMENTS_MOVEMENT_TYPES_ID
      FOREIGN KEY
        (movement_type_id)
      REFERENCES
        movement_types(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE movements DROP CONSTRAINT FK_MOVEMENTS_MOVEMENT_TYPES_ID;
    `);
    await queryRunner.query(`
      ALTER TABLE movements DROP CONSTRAINT FK_MOVEMENTS_ACCOUNTS_ID;
    `);
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_movements ON movements`,
    );
    await queryRunner.query(`DROP TABLE movements`);
  }
}
