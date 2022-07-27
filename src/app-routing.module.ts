import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ConfigModule],
})
export class AppRoutingModule {}
