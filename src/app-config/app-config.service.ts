import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppConfig } from './model/app-config.model';
import { AppConfigRepository } from './app-config.repository';

@Injectable()
export class AppConfigService {
  constructor(private readonly configRepository: AppConfigRepository) {}

  async getValue(key: string): Promise<any> {
    if (!key) throw new HttpException('', HttpStatus.BAD_REQUEST);
    return this.configRepository.getValue(key);
  }

  async createConfig(userId: number, config: AppConfig) {
    if (!userId) throw new HttpException('', HttpStatus.UNAUTHORIZED);
    return this.configRepository.createConfig(userId, config);
  }
}
