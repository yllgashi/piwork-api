import { Injectable } from '@nestjs/common';
import { Procedure } from 'src/shared/database/procedures';
import { JobApplication } from './model/job-application.model';
import { GetJobApplication } from './model/get-job-application.model';
import { MssqlService } from 'src/shared/database/mssql.service';

@Injectable()
export class ApplicationsRepository {
  constructor(private db: MssqlService) {}

  async getJobApplicationsByUser(userId: number): Promise<GetJobApplication[]> {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.db.execProcedure(
      Procedure.JOB_APPLICATION_GET_BY_USER,
      inputParams,
    );
    const getJobApplications: GetJobApplication[] =
      this.mapGetJobApplications(result);
    return getJobApplications;
  }

  async getApplicationsByJobId(jobId: number): Promise<GetJobApplication[]> {
    const inputParams = [{ name: 'jobId', value: jobId }];
    const { result } = await this.db.execProcedure(
      Procedure.JOB_APPLICATION_GET_BY_JOB_ID,
      inputParams,
    );
    const getJobApplications: GetJobApplication[] =
      this.mapGetJobApplications(result);
    return getJobApplications;
  }

  async getAnnouncedJobs(userId: number): Promise<GetJobApplication[]> {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.db.execProcedure(
      Procedure.JOB_APPLICATION_GET_ANNOUNCED_BY_USER,
      inputParams,
    );
    const getJobApplications: GetJobApplication[] =
      this.mapGetJobApplications(result);
    return getJobApplications;
  }

  async getJobApplicationDetails(
    applicationId: number,
  ): Promise<GetJobApplication> {
    const inputParams = [{ name: 'applicationId', value: applicationId }];
    const { result } = await this.db.execProcedure(
      Procedure.JOB_APPLICATION_GET_DETAILS,
      inputParams,
    );
    const getJobApplication: GetJobApplication =
      this.mapGetJobApplicationDetails(result[0]);
    return getJobApplication;
  }

  async createJobApplication(userId: number, jobApplication: JobApplication) {
    const { jobId, comment } = jobApplication;
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'jobId', value: jobId },
      { name: 'comment', value: comment },
    ];
    const { result } = await this.db.execProcedure(
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
    const { result } = await this.db.execProcedure(
      Procedure.JOB_APPLICATION_DELETE,
      inputParams,
    );
    return {};
  }

  async addEmployerComment(
    userId: number,
    jobApplicationId: number,
    comment: string,
  ) {
    console.log(userId);
    console.log(jobApplicationId);
    console.log(comment);
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'jobApplicationId', value: jobApplicationId },
      { name: 'comment', value: comment },
    ];
    const { result } = await this.db.execProcedure(
      Procedure.JOB_APPLICATION_ADD_EMPLOYER_COMMENT,
      inputParams,
    );
    return {};
  }

  async chooseJobApplicationWinner(userId: number, jobApplicationId: number) {
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'jobApplicationId', value: jobApplicationId },
    ];
    const { result } = await this.db.execProcedure(
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

  private mapGetJobApplications(queryResult: any): GetJobApplication[] {
    const getJobApplications: GetJobApplication[] = queryResult.map((e) => {
      const {
        Id,
        JobId,
        JobTitle,
        JobDescription,
        PublisherProfilePic,
        ApplicantUserId,
        ApplicantFirstName,
        ApplicantLastName,
        Comment,
        JobApplicationPhaseId,
        JobApplicationPhaseDescription,
        InsertDate,
        IsActive,
      } = e;
      const obj: GetJobApplication = {
        id: Id,
        jobId: JobId,
        jobTitle: JobTitle,
        jobDescription: JobDescription,
        publisherProfilePic: PublisherProfilePic,
        applicantUserId: ApplicantUserId,
        applicantFirstName: ApplicantFirstName,
        applicantLastName: ApplicantLastName,
        comment: Comment,
        jobApplicationPhaseId: JobApplicationPhaseId,
        jobApplicationPhaseDescription: JobApplicationPhaseDescription,
        insertDate: InsertDate,
        isActive: IsActive,
      };
      return obj;
    });
    return getJobApplications;
  }

  private mapGetJobApplicationDetails(queryResult: any): GetJobApplication {
    const {
      Id,
      JobId,
      JobTitle,
      JobDescription,
      PublisherProfilePic,
      ApplicantUserId,
      ApplicantFirstName,
      ApplicantLastName,
      Comment,
      JobApplicationPhaseId,
      JobApplicationPhaseDescription,
      InsertDate,
      IsActive,
    } = queryResult;
    const obj: GetJobApplication = {
      id: Id,
      jobId: JobId,
      jobTitle: JobTitle,
      jobDescription: JobDescription,
      publisherProfilePic: PublisherProfilePic,
      applicantUserId: ApplicantUserId,
      applicantFirstName: ApplicantFirstName,
      applicantLastName: ApplicantLastName,
      comment: Comment,
      jobApplicationPhaseId: JobApplicationPhaseId,
      jobApplicationPhaseDescription: JobApplicationPhaseDescription,
      insertDate: InsertDate,
      isActive: IsActive,
    };
    return obj;
  }
  //#endregion mappers
}
