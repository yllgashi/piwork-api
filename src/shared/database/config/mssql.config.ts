import { env } from "process";

export const mssqlconfig = {
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    server: env.DATABASE_SERVER, // You can use 'localhost\\instance' to connect to named instance
    database: env.DATABASE_NAME,
    options: {
      encrypt: false,
      enableArithAbort: false,
    },
    requestTimeout: 95000,
    connectionTimeout: 50000,
    port: +env.DATABASE_PORT,
  };
  