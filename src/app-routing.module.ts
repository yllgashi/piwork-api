import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { TechnologyModule } from './technology/technology.module';
import { AccountModule } from './account/account.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    AuthModule,
    AppConfigModule,
    AppConfigModule,
    TechnologyModule,
    AccountModule,
    JobModule,
  ],
})
export class AppRoutingModule {}
