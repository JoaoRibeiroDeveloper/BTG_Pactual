import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDocumentsTable1691102574418 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE documents(
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL,
        file VARCHAR(255) NOT NULL,
        document_type_id INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_documents
      BEFORE UPDATE ON
        documents
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
    await queryRunner.query(`
      ALTER TABLE
        documents
      ADD CONSTRAINT
        FK_DOCUMENTS_CLIENTS_ID
      FOREIGN KEY
        (client_id)
      REFERENCES
        clients(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);

    await queryRunner.query(`
      ALTER TABLE
        documents
      ADD CONSTRAINT
        FK_DOCUMENTS_DOCUMENTS_TYPES_ID
      FOREIGN KEY
        (document_type_id)
      REFERENCES
        documents_types(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE documents DROP CONSTRAINT FK_DOCUMENTS_DOCUMENTS_TYPES_ID;
    `);
    await queryRunner.query(`
      ALTER TABLE documents DROP CONSTRAINT FK_DOCUMENTS_CLIENTS_ID;
    `);
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_documents ON documents`,
    );
    await queryRunner.query(`DROP TABLE documents`);
  }
}
