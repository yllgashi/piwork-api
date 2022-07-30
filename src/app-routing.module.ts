import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, AppConfigModule, AppConfigModule],
})
export class AppRoutingModule {}
