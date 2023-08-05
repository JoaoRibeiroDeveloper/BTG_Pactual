import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientsTable1691096212322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE clients(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cpf CHAR(11) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        birth_date DATE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_clients
      BEFORE UPDATE ON
        clients
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_clients ON clients`,
    );
    await queryRunner.query(`DROP TABLE clients`);
  }
}
