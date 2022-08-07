import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AppConfigService } from './app-config.service';
import { AppConfigController } from './app-config.controller';
import { AppConfigRepository } from './app-config.repository';

@Module({
  imports: [SharedModule],
  controllers: [AppConfigController],
  providers: [AppConfigService, AppConfigRepository],
})
export class AppConfigModule {}
