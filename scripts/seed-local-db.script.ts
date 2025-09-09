import { db, pool} from '../server/db/db';
import * as schema from '../server/db/schema';
import { seed } from 'drizzle-seed';

const seedDb = async () => {
  await seed(db, schema).refine((funcs) => ({
    todosTable: {
      columns: {
        title: funcs.valuesFromArray({
          values: ['Buy groceries', 'Read a book', ' Call mom']
        }),
        description: funcs.valuesFromArray({
          values: ['at 5pm', 'weekly', 'carfully', undefined]
        })
      }
    }
  }))
};

seedDb().then(()=> {
    console.log('seeded database successfully')
    return pool.end();
}).catch((error) => {
    console.error('error seeding database', error)
    return pool.end();
})