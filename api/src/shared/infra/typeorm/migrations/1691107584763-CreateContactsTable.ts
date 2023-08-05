import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactsTable1691107584763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE contacts(
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL,
        email VARCHAR(256) UNIQUE NOT NULL,
        phone_number CHAR(11) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_contacts
      BEFORE UPDATE ON
        contacts
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
    await queryRunner.query(`
      ALTER TABLE
        contacts
      ADD CONSTRAINT
        FK_CONTACTS_CLIENTS_ID
      FOREIGN KEY
        (client_id)
      REFERENCES
        clients(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE contacts DROP CONSTRAINT FK_CONTACTS_CLIENTS_ID;
    `);
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_contacts ON contacts`,
    );
    await queryRunner.query(`DROP TABLE contacts`);
  }
}
