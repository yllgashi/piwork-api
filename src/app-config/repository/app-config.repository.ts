import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { Procedure } from 'src/shared/database/procedures';
import { AppConfig } from '../model/app-config.model';

@Injectable()
export class AppConfigRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getValue(key: string): Promise<any> {
    const data = await this.databaseService.execProcedure(
      Procedure.CONFIG_GET,
      [{ name: 'key', value: key }],
    );
    return data.result[0];
  }

  async createConfig(userId: number, config: AppConfig) {
    const { key, value } = config;
    const data = await this.databaseService.execProcedure(
      Procedure.CONFIG_INSERT,
      [
        { name: 'key', value: key },
        { name: 'value', value: value },
        { name: 'userId', value: userId },
      ],
    );
    return data.result;
  }
}
