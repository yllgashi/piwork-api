import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/shared/decorators/user.decorator';
import { Config } from '../model/config.model';
import { ConfigService } from '../service/config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get(':key')
  async getValue(@Param('key') key: string): Promise<any> {
    return this.configService.getValue(key);
  }

  @Post()
  async createConfig(@User('id') userId: number, @Body() config: Config) {
    return this.configService.createConfig(userId, config);
  }
}
