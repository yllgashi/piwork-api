import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FilesModule } from './files/files.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    AuthModule,
    AppConfigModule,
    AppConfigModule,
    AccountModule,
    JobsModule,
    ApplicationsModule,
    NotificationsModule,
    FilesModule,
    SkillsModule,
  ],
})
export class AppRoutingModule {}
