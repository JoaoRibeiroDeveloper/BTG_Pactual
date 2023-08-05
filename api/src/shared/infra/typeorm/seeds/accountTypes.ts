import { DataSource } from 'typeorm';

export const accountTypes = async (connection: DataSource) => {
  await connection.query(
    `INSERT INTO account_types(type) VALUES('CheckingAccount'), ('SavingsAccount');`,
  );
};
