import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';

import { mssqlconfig } from './config/mssql.config';
import { ProcedureResponse } from './models/procedure-response.model';

@Injectable()
export class DatabaseService {
  constructor() {}

  async query(queryString) {
    const pool = new sql.ConnectionPool(mssqlconfig());
    try {
      await pool.connect();
      const result = await pool.query(queryString);
      pool.close();
      return result.recordsets;
    } catch (error) {
      pool.close();
      throw error;
    }
  }

  async execProcedure(
    procedureName: string,
    inputParams: { name: string; value: any }[] = [],
    outputParams: { name: string; value: any }[] = [],
  ) {
    const pool = new sql.ConnectionPool(mssqlconfig());
    try {
      await pool.connect();
      // create request
      const request = await pool.request();
      // add input params
      inputParams.forEach((e) => request.input(e.name, e.value));
      // add output params
      outputParams.forEach((e) => request.output(e.name, e.value));
      // execute procedure
      const result = await request.execute(procedureName);
      pool.close();

      const procResponse: ProcedureResponse = {
        result: result.recordset,
        outputParams: result.output,
      };
      
      return procResponse;
    } catch (error) {
      pool.close();
      throw error;
    }
  }
}
