import { DataSource } from 'typeorm';

export const movementTypes = async (connection: DataSource) => {
  await connection.query(
    `INSERT INTO movement_types(type) VALUES('Deposit'), ('Withdrawal');`,
  );
};
