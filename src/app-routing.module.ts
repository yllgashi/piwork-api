import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
  imports: [UsersModule, AppConfigModule, AppConfigModule],
})
export class AppRoutingModule {}
