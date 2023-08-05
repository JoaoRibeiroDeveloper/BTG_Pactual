import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDocumentsTypesTable1691099736054
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE documents_types(
        id SERIAL PRIMARY KEY,
        type VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_documents_types
      BEFORE UPDATE ON
        documents_types
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_documents_types ON documents_types`,
    );
    await queryRunner.query(`DROP TABLE documents_types`);
  }
}
