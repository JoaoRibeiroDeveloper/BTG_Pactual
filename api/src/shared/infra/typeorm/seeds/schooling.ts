import { DataSource } from 'typeorm';

export const schooling = async (connection: DataSource) => {
  await connection.query(
    `INSERT INTO
      schooling(level)
    VALUES
      ('Analfabeto'),
      ('Ensino Fundamental Completo'),
      ('Ensino Fundamental Incompleto'),
      ('Ensino Médio Completo'),
      ('Ensino Médio Incompleto'),
      ('Superior Incompleto'),
      ('Superior Completo'),
      ('Especialização'),
      ('MBA'),
      ('Mestrado'),
      ('Doutorado'),
      ('Pós-Doutorado');`,
  );
};
