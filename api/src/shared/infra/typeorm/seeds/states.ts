import { DataSource } from 'typeorm';

export const states = async (connection: DataSource) => {
  await connection.query(
    `INSERT INTO
      states (cod, abbreviation_uf, uf)
    VALUES
      ('12', 'AC', 'Acre'),
      ('27', 'AL', 'Alagoas'),
      ('16', 'AP', 'Amapá'),
      ('13', 'AM', 'Amazonas'),
      ('29', 'BA', 'Bahia'),
      ('23', 'CE', 'Ceará'),
      ('53', 'DF', 'Distrito Federal'),
      ('32', 'ES', 'Espírito Santo'),
      ('52', 'GO', 'Goiás'),
      ('21', 'MA', 'Maranhão'),
      ('51', 'MT', 'Mato Grosso'),
      ('50', 'MS', 'Mato Grosso do Sul'),
      ('31', 'MG', 'Minas Gerais'),
      ('15', 'PA', 'Pará'),
      ('25', 'PB', 'Paraíba'),
      ('41', 'PR', 'Paraná'),
      ('26', 'PE', 'Pernambuco'),
      ('22', 'PI', 'Piauí'),
      ('33', 'RJ', 'Rio de Janeiro'),
      ('24', 'RN', 'Rio Grande do Norte'),
      ('43', 'RS', 'Rio Grande do Sul'),
      ('11', 'RO', 'Rondônia'),
      ('14', 'RR', 'Roraima'),
      ('42', 'SC', 'Santa Catarina'),
      ('35', 'SP', 'São Paulo'),
      ('28', 'SE', 'Sergipe'),
      ('17', 'TO', 'Tocantins');`,
  );
};
