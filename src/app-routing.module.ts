import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { TechnologyModule } from './technology/technology.module';

@Module({
  imports: [AuthModule, AppConfigModule, AppConfigModule, TechnologyModule],
})
export class AppRoutingModule {}
