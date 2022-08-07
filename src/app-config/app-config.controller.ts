import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AppConfig } from './model/app-config.model';
import { AppConfigService } from './app-config.service';

@ApiBearerAuth()
@ApiTags('AppConfig')
@Controller('app-config')
export class AppConfigController {
  constructor(private readonly configService: AppConfigService) {}

  @Auth()
  @Get(':key')
  async getValue(@Param('key') key: string): Promise<any> {
    return this.configService.getValue(key);
  }

  @Auth()
  @Post()
  async createConfig(
    @CurrentUser('userId') userId: number,
    @Body() config: AppConfig,
  ) {
    return this.configService.createConfig(userId, config);
  }
}
