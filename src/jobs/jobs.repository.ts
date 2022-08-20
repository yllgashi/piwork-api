import { Injectable } from '@nestjs/common';
import { Procedure } from 'src/shared/database/procedures';
import { BaseRepository } from 'src/shared/database/base.repository';
import { JobDetails } from './model/job-details.model';
import { Job } from './model/job.model';
import * as sql from 'mssql';
import { JobCreate } from './model/job-create.model';
import { JobField } from './model/job-field.model';
import { JobTechnology } from './model/job-technology.model';

@Injectable()
export class JobsRepository extends BaseRepository {
  async getAllJobs(): Promise<Job[]> {
    const { result } = await this.execProc(Procedure.JOB_GET_ALL);
    const jobs: Job[] = this.mapJobs(result);
    return jobs;
  }

  async getJobDetails(jobId: number): Promise<JobDetails> {
    let jobDetails: JobDetails = await this.getBasicJobDetails(jobId);
    const jobRequiredTechnologiesQueryRes =
      await this.getJobRequiredTechnologies(jobId);
    jobDetails.jobFields = this.mapJobFields(jobRequiredTechnologiesQueryRes);
    jobDetails.jobTechnologies = this.mapJobTechnologies(
      jobRequiredTechnologiesQueryRes,
    );
    return jobDetails;
  }

  async createJob(userId: number, jobDetails: JobCreate) {
    const {
      title,
      description,
      sourceCodeLink,
      estimatedDays,
      contactEmail,
      priceAmount,
      technologiesIds,
    } = jobDetails;
    const tvpJobTechnologies = new sql.Table();
    tvpJobTechnologies.columns.add('TechnologyId', sql.Int);
    technologiesIds.forEach((e) => tvpJobTechnologies.rows.add(e));
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'title', value: title },
      { name: 'description', value: description },
      { name: 'sourceCodeLink', value: sourceCodeLink },
      { name: 'estimatedDays', value: estimatedDays },
      { name: 'contactEmail', value: contactEmail },
      { name: 'priceAmount', value: priceAmount },
      { name: 'tvpJobTechnologies', value: tvpJobTechnologies },
    ];
    const { result } = await this.execProc(Procedure.JOB_CREATE, inputParams);
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
    const { result } = await this.execProc(Procedure.JOB_UPDATE, inputParams);
    return {};
  }

  async changeJobStatus(userId: number, jobId: number, isactive: boolean) {
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'jobId', value: jobId },
      { name: 'isActive', value: isactive },
    ];
    const { result } = await this.execProc(
      Procedure.JOB_CHANGE_STATUS,
      inputParams,
    );
    return {};
  }

  async getJobsByField(fieldId: number) {
    const inputParams = [{ name: 'fieldId', value: fieldId }];
    const { result } = await this.execProc(
      Procedure.JOB_GET_BY_FIELD_ID,
      inputParams,
    );
    const jobs: Job[] = this.mapJobs(result);
    return jobs;
  }

  async getJobsByTechnology(technologyId: number) {
    const inputParams = [{ name: 'technologyId', value: technologyId }];
    const { result } = await this.execProc(
      Procedure.JOB_GET_BY_TECHNOLOGY_ID,
      inputParams,
    );
    const jobs: Job[] = this.mapJobs(result);
    return jobs;
  }

  private async getBasicJobDetails(jobId: number): Promise<JobDetails> {
    const inputParams = [{ name: 'jobId', value: jobId }];
    const { result } = await this.execProc(
      Procedure.JOB_GET_DETAILS,
      inputParams,
    );
    const jobDetails: JobDetails = this.mapJobDetails(result[0]);
    return jobDetails;
  }

  private async getJobRequiredTechnologies(jobId: number): Promise<any> {
    const inputParams = [{ name: 'jobId', value: jobId }];
    const { result } = await this.execProc(
      Procedure.JOB_GET_JOB_REQUIRED_TECHNOLOGIES,
      inputParams,
    );
    return result;
  }

  //#region mappers
  private mapJobs(queryResult: any): Job[] {
    const jobs: Job[] = queryResult.map((e) => {
      const { Id, Title, PriceAmount, Description, InsertDate, IsActive } = e;
      const job: Job = {
        id: Id,
        title: Title,
        priceAmount: PriceAmount,
        description: Description,
        insertDate: InsertDate,
        isActive: IsActive,
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
      PublisherProfilePic,
      PriceAmount,
      IsActive,
    } = queryResult;
    const jobDetails: JobDetails = {
      id: Id,
      title: Title,
      description: Description,
      estimatedDays: EstimatedDays,
      priceAmount: PriceAmount,
      contactEmail: ContactEmail,
      publishedByUserFirstName: PublishedByUserFirstName,
      publishedByUserLastName: PublishedByUserLastName,
      publisherProfilePic: PublisherProfilePic,
      publishedByUserId: PublishedByUserId,
      sourceCodeLink: SourceCodeLink,
      isActive: IsActive,
    };
    return jobDetails;
  }

  private mapJobTechnologies(queryResult: any): JobTechnology[] {
    const jobTechnologies: JobTechnology[] = queryResult.map((e) => {
      const { TechnologyId, TechnologyName, TechnologyIcon } = e;
      const jobTechnology: JobTechnology = {
        technologyId: TechnologyId,
        technologyName: TechnologyName,
        technologyIcon: TechnologyIcon,
      };
      return jobTechnology;
    });
    return jobTechnologies;
  }

  private mapJobFields(queryResult: any): JobField[] {
    const jobFields: JobField[] = queryResult.map((e) => {
      const { FieldId, FieldName } = e;
      const jobField: JobField = { fieldId: FieldId, fieldName: FieldName };
      return jobField;
    });
    return jobFields;
  }
  //#endregion mappers
}
