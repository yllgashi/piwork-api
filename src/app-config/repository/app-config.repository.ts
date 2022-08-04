import { Injectable } from '@nestjs/common';
import { Procedure } from 'src/shared/database/procedures';
import { BaseRepository } from 'src/shared/service/base.repository';
import { AppConfig } from '../model/app-config.model';

@Injectable()
export class AppConfigRepository extends BaseRepository {
  async getValue(key: string): Promise<any> {
    const { result } = await this.execProc(Procedure.CONFIG_GET, [
      { name: 'key', value: key },
    ]);
    const value: string = this.mapAppConfig(result[0]);
    return value;
  }

  async createConfig(userId: number, config: AppConfig) {
    const { key, value } = config;
    const { result } = await this.execProc(Procedure.CONFIG_INSERT, [
      { name: 'key', value: key },
      { name: 'value', value: value },
      { name: 'userId', value: userId },
    ]);
    return result;
  }

  //#region mappers
  private mapAppConfig(queryResult: any): string {
    const { Value } = queryResult;
    return Value;
  }
  //#endregion mappers
}
