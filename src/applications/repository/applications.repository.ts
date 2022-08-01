import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { JobApplication } from '../model/job-application.model';

@Injectable()
export class ApplicationsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getJobApplicationsByUser(userId: number) {
    const inputParams = [{ name: 'userId', value: userId }];
    const data = await this.databaseService.execProcedure(
      'Work.usp_JobApplication_GetByUser',
      inputParams,
    );
    const jobApplications: JobApplication[] = this.mapJobApplications(
      data.result,
    );
    return jobApplications;
  }

  async createJobApplication(userId: number, jobApplication: JobApplication) {
    const { jobId, comment } = jobApplication;
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'jobId', value: jobId },
      { name: 'comment', value: comment },
    ];
    const data = await this.databaseService.execProcedure(
      'Work.usp_JobApplication_Insert',
      inputParams,
    );
    return {};
  }

  async deleteJobApplication(userId: number, jobId: number) {
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'jobId', value: jobId },
    ];
    const data = await this.databaseService.execProcedure(
      'Work.usp_JobApplication_Delete',
      inputParams,
    );
    return {};
  }

  async chooseJobApplicationWinner(userId: number, jobApplicationId: number) {
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'jobApplicationId', value: jobApplicationId },
    ];
    const data = await this.databaseService.execProcedure(
      'Work.usp_JobApplication_ChooseWinner',
      inputParams,
    );
    return {};
  }

  //#region mappers
  private mapJobApplications(queryResult: any): JobApplication[] {
    const jobApplications: JobApplication[] = queryResult.map((e) => {
      const { Id, JobId, Comment } = e;
      const jobApplication: JobApplication = {
        id: Id,
        jobId: JobId,
        comment: Comment,
      };
      return jobApplication;
    });
    return jobApplications;
  }
  //#endregion mappers
}
