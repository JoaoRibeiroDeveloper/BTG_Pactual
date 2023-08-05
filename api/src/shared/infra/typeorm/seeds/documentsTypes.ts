import { DataSource } from 'typeorm';

export const documentsTypes = async (connection: DataSource) => {
  await connection.query(
    `INSERT INTO documents_types(type) VALUES('RG'), ('CNH'), ('RNE');`,
  );
};
