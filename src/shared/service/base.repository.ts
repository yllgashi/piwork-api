import { Injectable } from '@nestjs/common';
import { MssqlService } from '../database/mssql.service';

@Injectable()
export class BaseRepository {
  constructor(private readonly databaseService: MssqlService) {}

  async execProc(
    procedureName: string,
    inputParams: { name: string; value: any }[] = [],
    outputParams: { name: string; value: any }[] = [],
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
