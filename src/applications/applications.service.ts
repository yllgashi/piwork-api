import { Injectable } from '@nestjs/common';
import { JobApplication } from './model/job-application.model';
import { ApplicationsRepository } from './applications.repository';

@Injectable()
export class ApplicationsService {
  constructor(private applicationsRepository: ApplicationsRepository) {}

  async getJobApplicationsByUser(userId: number) {
    return await this.applicationsRepository.getJobApplicationsByUser(userId);
  }

  async createJobApplication(userId: number, jobApplication: JobApplication) {
    return await this.applicationsRepository.createJobApplication(
      userId,
      jobApplication,
    );
  }

  async deleteJobApplication(userId: number, id: number) {
    return await this.applicationsRepository.deleteJobApplication(userId, id);
  }

  async chooseJobApplicationWinner(userId: number, id: number) {
    return await this.applicationsRepository.chooseJobApplicationWinner(
      userId,
      id,
    );
  }
}
