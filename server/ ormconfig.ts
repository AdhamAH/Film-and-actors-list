import { User } from './src/entities/User';
import { Films } from './src/entities/Films';

export const config = {
  type: 'sqlite',
  database: './db1.sqlite3',
  entities: [User, Films],
  synchronize: true,
  migrationsTableName: 'custom_migration_table',
  migrations: ['migration/*.js'],
  cli: {
    migrationsDir: '/src/db/migrations',
  },
};
