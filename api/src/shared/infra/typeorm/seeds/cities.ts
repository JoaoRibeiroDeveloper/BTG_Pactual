import fs from 'fs';
import path from 'path';
import { DataSource } from 'typeorm';

export const cities = async (connection: DataSource) => {
  const dataFile = path.resolve(__dirname, 'data', 'cities.json');
  const response = await fs.promises.readFile(dataFile, 'utf8');
  const citiesData = JSON.parse(response);

  const valuesToInsert = citiesData.cities
    .map(city => `('${city.name}', '${city.cod_ibge}','${city.state_cod}')`)
    .join(', ')
    .concat(';');

  await connection.query(
    `INSERT INTO cities(name, cod_ibge, state_cod) VALUES ${valuesToInsert}`,
  );
};
