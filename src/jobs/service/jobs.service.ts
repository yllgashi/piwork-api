import { Injectable } from '@nestjs/common';
import { JobsRepository } from '../repository/jobs.repository';

@Injectable()
export class JobsService {
  constructor(private jobsRepository: JobsRepository) {}
}
