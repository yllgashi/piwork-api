import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { Procedure } from 'src/shared/database/procedures';
import { JobDetails } from '../model/job-details.model';
import { Job } from '../model/job.model';

@Injectable()
export class JobsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllJobs(): Promise<Job[]> {
    const data = await this.databaseService.execProcedure(
      Procedure.JOB_GET_ALL,
    );
    const jobs: Job[] = this.mapJobs(data.result);
    return jobs;
  }

  async getJobDetails(jobId: number): Promise<JobDetails> {
    const inputParams = [{ name: 'jobId', value: jobId }];
    const data = await this.databaseService.execProcedure(
      Procedure.JOB_GET_DETAILS,
      inputParams,
    );
    const jobDetails: JobDetails = this.mapJobDetails(data.result[0]);
    return jobDetails;
  }

  async createJob(userId: number, jobDetails: JobDetails) {
    const {
      title,
      description,
      sourceCodeLink,
      estimatedDays,
      contactEmail,
      priceAmount,
      jobTechnologies,
    } = jobDetails;
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'title', value: title },
      { name: 'description', value: description },
      { name: 'sourceCodeLink', value: sourceCodeLink },
      { name: 'estimatedDays', value: estimatedDays },
      { name: 'contactEmail', value: contactEmail },
      { name: 'priceAmount', value: priceAmount },
      // {name: 'tvpJobTechnologies', value: jobTechnologies}
    ];
    const data = await this.databaseService.execProcedure(
      Procedure.JOB_CREATE,
      inputParams,
    );
    return {};
  }

  async editJob(userId: number, jobDetails: JobDetails) {
    const {
      id,
      title,
      description,
      sourceCodeLink,
      estimatedDays,
      contactEmail,
      priceAmount,
      isActive,
    } = jobDetails;
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'jobId', value: id },
      { name: 'active', value: isActive },
      { name: 'title', value: title },
      { name: 'description', value: description },
      { name: 'sourceCodeLink', value: sourceCodeLink },
      { name: 'estimatedDays', value: estimatedDays },
      { name: 'contactEmail', value: contactEmail },
      { name: 'priceAmount', value: priceAmount },
    ];
    const data = await this.databaseService.execProcedure(
      Procedure.JOB_UPDATE,
      inputParams,
    );
    return {};
  }

  async changeJobStatus(userId: number, jobId: number, isactive: boolean) {
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'jobId', value: jobId },
      { name: 'isActive', value: isactive },
    ];
    const data = await this.databaseService.execProcedure(
      Procedure.JOB_CHANGE_STATUS,
      inputParams,
    );
    return {};
  }

  async getJobsByField(fieldId: number) {
    const inputParams = [{ name: 'fieldId', value: fieldId }];
    const data = await this.databaseService.execProcedure(
      Procedure.JOB_GET_BY_FIELD_ID,
      inputParams,
    );
    const jobs: Job[] = this.mapJobs(data.result);
    return jobs;
  }

  async getJobsByTechnology(technologyId: number) {
    const inputParams = [{ name: 'technologyId', value: technologyId }];
    const data = await this.databaseService.execProcedure(
      Procedure.JOB_GET_BY_TECHNOLOGY_ID,
      inputParams,
    );
    const jobs: Job[] = this.mapJobs(data.result);
    return jobs;
  }
  //#region mappers
  private mapJobs(queryResult: any): Job[] {
    const jobs: Job[] = queryResult.map((e) => {
      const { Id, Title, Description, EstimatedDays, PriceAmount } = e;
      const job: Job = {
        id: Id,
        title: Title,
        description: Description,
        estimatedDays: EstimatedDays,
        priceAmount: PriceAmount,
      };
      return job;
    });
    return jobs;
  }

  private mapJobDetails(queryResult: any): JobDetails {
    const {
      Id,
      Title,
      Description,
      SourceCodeLink,
      EstimatedDays,
      ContactEmail,
      PublishedByUserId,
      PublishedByUserFirstName,
      PublishedByUserLastName,
      PriceAmonut,
      IsActive,
    } = queryResult;
    const jobDetails: JobDetails = {
      id: Id,
      title: Title,
      description: Description,
      estimatedDays: EstimatedDays,
      priceAmount: PriceAmonut,
      contactEmail: ContactEmail,
      publishedByUserFirstName: PublishedByUserFirstName,
      publishedByUserLastName: PublishedByUserLastName,
      publishedByUserId: PublishedByUserId,
      sourceCodeLink: SourceCodeLink,
      isActive: IsActive,
    };
    return jobDetails;
  }
  //#endregion mappers
}
