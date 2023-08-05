import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddressTable1691110128183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE address(
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL,
        cep CHAR(8) NOT NULL,
        city_id INTEGER NOT NULL,
        district VARCHAR(255) NOT NULL,
        street VARCHAR(255) NOT NULL,
        number VARCHAR(255) NULL,
        complement VARCHAR(255) NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE TRIGGER
        trigger_run_updated_at_address
      BEFORE UPDATE ON
        address
      FOR EACH ROW EXECUTE FUNCTION
        run_updated_at();
    `);
    await queryRunner.query(`
      ALTER TABLE
        address
      ADD CONSTRAINT
        FK_ADDRESS_CLIENTS_ID
      FOREIGN KEY
        (client_id)
      REFERENCES
        clients(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
      ALTER TABLE
        address
      ADD CONSTRAINT
        FK_ADDRESS_CITIES_ID
      FOREIGN KEY
        (city_id)
      REFERENCES
        cities(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE address DROP CONSTRAINT FK_ADDRESS_CITIES_ID;
    `);
    await queryRunner.query(`
      ALTER TABLE address DROP CONSTRAINT FK_ADDRESS_CLIENTS_ID;
    `);
    await queryRunner.query(
      `DROP TRIGGER trigger_run_updated_at_address ON address`,
    );
    await queryRunner.query(`DROP TABLE address`);
  }
}
