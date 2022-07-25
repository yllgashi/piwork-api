import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Config } from '../model/config.model';
import { ConfigRepository } from '../repository/config.repository';

@Injectable()
export class ConfigService {
  constructor(private readonly configRepository: ConfigRepository) {}

  async getValue(key: string): Promise<any> {
    if (!key) throw new HttpException('', HttpStatus.BAD_REQUEST);
    return this.configRepository.getValue(key);
  }

  async createConfig(userId: number, config: Config) {
    if (!userId) throw new HttpException('', HttpStatus.UNAUTHORIZED);
    return this.configRepository.createConfig(userId, config);
  }
}
