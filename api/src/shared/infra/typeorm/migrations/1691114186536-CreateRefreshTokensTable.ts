import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRefreshTokensTable1691114186536
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE refresh_tokens(
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        valid BOOLEAN NOT NULL,
        expires TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_refresh_tokens
      BEFORE UPDATE ON
        refresh_tokens
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
    await queryRunner.query(`
      ALTER TABLE
        refresh_tokens
      ADD CONSTRAINT
        FK_REFRESH_TOKENS_CLIENTS_ID
      FOREIGN KEY
        (client_id)
      REFERENCES
        clients(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE refresh_tokens DROP CONSTRAINT FK_REFRESH_TOKENS_CLIENTS_ID;
    `);
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_refresh_tokens ON refresh_tokens`,
    );
    await queryRunner.query(`DROP TABLE refresh_tokens`);
  }
}
