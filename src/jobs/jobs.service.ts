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

  async getAnnouncedJobs(userId: number): Promise<Job[]> {
    return await this.jobsRepository.getAnnouncedJobs(userId);
  }

  async filterJobs(title: string, skillId: number): Promise<Job[]> {
    return await this.jobsRepository.filterJobs(title, skillId);
  }

  async getJobDetails(jobId: number, userId: number): Promise<JobDetails> {
    let jobDetails: JobDetails = await this.jobsRepository.getBasicJobDetails(
      jobId,
      userId,
    );
    jobDetails.requiredSkills = await this.jobsRepository.getJobRequiredSkills(
      jobId,
    );
    return jobDetails;
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

  async getJobsBySkill(skillId: number) {
    return await this.jobsRepository.getJobsBySkill(skillId);
  }
}
