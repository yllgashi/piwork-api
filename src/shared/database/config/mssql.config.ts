import { env } from 'process';

export function mssqlconfig(): any {
  const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_PORT } =
    env;

  return {
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    server: 'localhost',
    database: DATABASE_NAME,
    options: {
      encrypt: false,
      enableArithAbort: false,
    },
    requestTimeout: 95000,
    connectionTimeout: 50000,
    port: +DATABASE_PORT,
  };
}
