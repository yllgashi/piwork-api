import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { Config } from '../model/config.model';

@Injectable()
export class ConfigRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getValue(key: string): Promise<any> {
    const data = await this.databaseService.execProcedure(
      'App.usp_Config_Get',
      [{ name: 'key', value: key }],
    );
    return data.result;
  }

  async createConfig(userId: number, config: Config) {
    const { key, value } = config;
    const data = await this.databaseService.execProcedure(
      'App.usp_Config_Insert',
      [
        { name: 'key', value: key },
        { name: 'value', value: value },
        { name: 'userId', value: userId },
      ],
    );
    return data.result;
  }
}
