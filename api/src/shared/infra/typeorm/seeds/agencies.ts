import { DataSource } from 'typeorm';

export const agencies = async (connection: DataSource) => {
  await connection.query(
    `INSERT INTO agencies(name, cod_bank, bank) VALUES('00001', '208', 'BTG PACTUAL S.A.');`,
  );
};
