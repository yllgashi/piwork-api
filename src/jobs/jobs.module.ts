import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { JobsController } from './controller/jobs.controller';
import { JobsRepository } from './repository/jobs.repository';
import { JobsService } from './service/jobs.service';

@Module({
  imports: [SharedModule],
  controllers: [JobsController],
  providers: [JobsService, JobsRepository],
})
export class JobsModule {}
