import { Injectable } from '@nestjs/common';
import { JobDetails } from './model/job-details.model';

import { Job } from './model/job.model';
import { JobsRepository } from './jobs.repository';
import { JobCreate } from './model/job-create.model';

@Injectable()
export class JobsService {
  constructor(private jobsRepository: JobsRepository) {}

  async getAllJobs(): Promise<Job[]> {
    return await this.jobsRepository.getAllJobs();
  }

  async getJobDetails(jobId: number): Promise<JobDetails> {
    return await this.jobsRepository.getJobDetails(jobId);
  }

  async createJob(userId: number, jobCreate: JobCreate) {
    return await this.jobsRepository.createJob(userId, jobCreate);
  }

  async editJob(userId: number, jobDetails: JobDetails) {
    return await this.jobsRepository.editJob(userId, jobDetails);
  }

  async changeJobStatus(userId: number, jobId: number, isactive: boolean) {
    return await this.jobsRepository.changeJobStatus(userId, jobId, isactive);
  }

  async getJobsByField(fieldId: number) {
    return await this.jobsRepository.getJobsByField(fieldId);
  }

  async getJobsByTechnology(technologyId: number) {
    return await this.jobsRepository.getJobsByTechnology(technologyId);
  }
}
