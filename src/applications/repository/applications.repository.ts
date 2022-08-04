import { Injectable } from '@nestjs/common';
import { Procedure } from 'src/shared/database/procedures';
import { BaseRepository } from 'src/shared/service/base.repository';
import { JobApplication } from '../model/job-application.model';

@Injectable()
export class ApplicationsRepository extends BaseRepository {
  async getJobApplicationsByUser(userId: number) {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.execProc(
      Procedure.JOB_APPLICATION_GET_BY_USER,
      inputParams,
    );
    const jobApplications: JobApplication[] = this.mapJobApplications(result);
    return jobApplications;
  }

  async createJobApplication(userId: number, jobApplication: JobApplication) {
    const { jobId, comment } = jobApplication;
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'jobId', value: jobId },
      { name: 'comment', value: comment },
    ];
    const { result } = await this.execProc(
      Procedure.JOB_APPLICATION_CREATE,
      inputParams,
    );
    return {};
  }

  async deleteJobApplication(userId: number, jobId: number) {
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'jobId', value: jobId },
    ];
    const { result } = await this.execProc(
      Procedure.JOB_APPLICATION_DELETE,
      inputParams,
    );
    return {};
  }

  async chooseJobApplicationWinner(userId: number, jobApplicationId: number) {
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'jobApplicationId', value: jobApplicationId },
    ];
    const { result } = await this.execProc(
      Procedure.JOB_APPLICATION_CHOOSE_WINNER,
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
