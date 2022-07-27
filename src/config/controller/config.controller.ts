import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { Config } from '../model/config.model';
import { ConfigService } from '../service/config.service';

@ApiBearerAuth()
@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Auth()
  @Get(':key')
  async getValue(@Param('key') key: string): Promise<any> {
    return this.configService.getValue(key);
  }

  @Auth()
  @Post()
  async createConfig(
    @CurrentUser('userId') userId: number,
    @Body() config: Config,
  ) {
    return this.configService.createConfig(userId, config);
  }
}
