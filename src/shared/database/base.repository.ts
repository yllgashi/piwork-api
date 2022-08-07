import { Injectable } from '@nestjs/common';
import { ProcedureParameter } from './models/procedure-parameter.model';
import { MssqlService } from './mssql.service';

@Injectable()
export class BaseRepository {
  constructor(private readonly databaseService: MssqlService) {}

  async execProc(
    procedureName: string,
    inputParams: ProcedureParameter[] = [],
    outputParams: ProcedureParameter[] = [],
  ): Promise<any> {
    return await this.databaseService.execProcedure(
      procedureName,
      inputParams,
      outputParams,
    );
  }

  async execQuery(query: string): Promise<any> {
    return await this.databaseService.query(query);
  }
}
