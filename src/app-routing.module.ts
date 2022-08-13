import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { TechnologyModule } from './technology/technology.module';
import { AccountModule } from './account/account.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    AuthModule,
    AppConfigModule,
    AppConfigModule,
    TechnologyModule,
    AccountModule,
    JobsModule,
    ApplicationsModule,
    NotificationsModule,
    FilesModule,
  ],
})
export class AppRoutingModule {}
