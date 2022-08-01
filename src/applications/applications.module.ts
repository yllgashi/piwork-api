import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { ApplicationsController } from './controller/applications.controller';
import { ApplicationsRepository } from './repository/applications.repository';
import { ApplicationsService } from './service/applications.service';

@Module({
  imports: [SharedModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationsRepository],
})
export class ApplicationsModule {}
