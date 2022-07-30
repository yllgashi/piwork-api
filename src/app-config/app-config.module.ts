import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AppConfigService } from './service/app-config.service';
import { AppConfigController } from './controller/app-config.controller';
import { AppConfigRepository } from './repository/app-config.repository';

@Module({
  imports: [SharedModule],
  controllers: [AppConfigController, AppConfigController],
  providers: [AppConfigService, AppConfigRepository],
})
export class AppConfigModule {}
