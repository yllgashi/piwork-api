import { Injectable } from '@nestjs/common';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class JobService {
  constructor(private jobRepository: JobRepository) {}
}
