import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { JobController } from './controller/job.controller';
import { JobRepository } from './repository/job.repository';
import { JobService } from './service/job.service';

@Module({
  imports: [SharedModule],
  controllers: [JobController],
  providers: [JobService, JobRepository],
})
export class JobModule {}
