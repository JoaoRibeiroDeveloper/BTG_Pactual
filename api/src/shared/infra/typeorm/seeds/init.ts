import { accountTypes } from './accountTypes';
import { agencies } from './agencies';
import { documentsTypes } from './documentsTypes';
import { movementTypes } from './movementTypes';
import { schooling } from './schooling';
import { states } from './states';
import { cities } from './cities';
import { dataSource } from '..';

const create = async () => {
  const connection = await dataSource.initialize();
  try {
    await connection.query('BEGIN');
    await accountTypes(connection);
    await agencies(connection);
    await documentsTypes(connection);
    await movementTypes(connection);
    await schooling(connection);
    await states(connection);
    await cities(connection);
    await connection.query('COMMIT');
    console.log('Initialization of default data successfully done!');
  } catch (err) {
    console.error(
      'Error during initialization of default data, rolling back:',
      err,
    );
    await connection.query('ROLLBACK');
  } finally {
    await connection.destroy();
  }
};
create();
