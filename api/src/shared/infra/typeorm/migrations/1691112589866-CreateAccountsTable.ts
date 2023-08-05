import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountsTable1691112589866 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE accounts(
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL,
        account_number CHAR(9) UNIQUE NOT NULL,
        balance NUMERIC(15, 2) NOT NULL,
        agency_id INTEGER NOT NULL,
        account_type_id INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_accounts
      BEFORE UPDATE ON
        accounts
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
    await queryRunner.query(`
      ALTER TABLE
        accounts
      ADD CONSTRAINT
        FK_ACCOUNTS_CLIENTS_ID
      FOREIGN KEY
        (client_id)
      REFERENCES
        clients(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
      ALTER TABLE
        accounts
      ADD CONSTRAINT
        FK_ACCOUNTS_AGENCIES_ID
      FOREIGN KEY
        (agency_id)
      REFERENCES
        agencies(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
      ALTER TABLE
        accounts
      ADD CONSTRAINT
        FK_ACCOUNTS_ACCOUNT_TYPES_ID
      FOREIGN KEY
        (account_type_id)
      REFERENCES
        account_types(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE accounts DROP CONSTRAINT FK_ACCOUNTS_ACCOUNT_TYPES_ID;
    `);
    await queryRunner.query(`
      ALTER TABLE accounts DROP CONSTRAINT FK_ACCOUNTS_AGENCIES_ID;
    `);
    await queryRunner.query(`
      ALTER TABLE accounts DROP CONSTRAINT FK_ACCOUNTS_CLIENTS_ID;
    `);
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_accounts ON accounts`,
    );
    await queryRunner.query(`DROP TABLE accounts`);
  }
}
