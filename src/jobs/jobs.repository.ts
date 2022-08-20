import { Injectable } from '@nestjs/common';
import { Procedure } from 'src/shared/database/procedures';
import { BaseRepository } from 'src/shared/database/base.repository';
import { JobDetails } from './model/job-details.model';
import { Job } from './model/job.model';
import * as sql from 'mssql';
import { JobCreate } from './model/job-create.model';
import { Skill } from 'src/skills/model/skill.model';

@Injectable()
export class JobsRepository extends BaseRepository {
  async getBasicJobDetails(jobId: number): Promise<JobDetails> {
    const inputParams = [{ name: 'jobId', value: jobId }];
    const { result } = await this.execProc(
      Procedure.JOB_GET_DETAILS,
      inputParams,
    );
    const jobDetails: JobDetails = this.mapJobDetails(result[0]);
    return jobDetails;
  }

  async getJobRequiredSkills(jobId: number): Promise<Skill[]> {
    const inputParams = [{ name: 'jobId', value: jobId }];
    const { result } = await this.execProc(
      Procedure.JOB_GET_REQUIRED_SKILLS,
      inputParams,
    );
    const skills: Skill[] = this.mapSkills(result);
    return skills;
  }

  async getAllJobs(): Promise<Job[]> {
    const { result } = await this.execProc(Procedure.JOB_GET_ALL);
    const jobs: Job[] = this.mapJobs(result);
    return jobs;
  }

  async createJob(userId: number, jobDetails: JobCreate) {
    const {
      title,
      description,
      sourceCodeLink,
      estimatedDays,
      contactEmail,
      priceAmount,
      skillsIds,
    } = jobDetails;
    const tvpJobSkills = new sql.Table();
    tvpJobSkills.columns.add('SkillId', sql.Int);
    skillsIds.forEach((e) => tvpJobSkills.rows.add(e));
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'title', value: title },
      { name: 'description', value: description },
      { name: 'sourceCodeLink', value: sourceCodeLink },
      { name: 'estimatedDays', value: estimatedDays },
      { name: 'contactEmail', value: contactEmail },
      { name: 'priceAmount', value: priceAmount },
      { name: 'tvpJobSkills', value: tvpJobSkills },
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

  async getJobsBySkill(skillId: number) {
    const inputParams = [{ name: 'skillId', value: skillId }];
    const { result } = await this.execProc(
      Procedure.JOB_GET_BY_SKILL_ID,
      inputParams,
    );
    const jobs: Job[] = this.mapJobs(result);
    return jobs;
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

  private mapSkills(queryResult: any): Skill[] {
    const skills: Skill[] = queryResult.map((e) => {
      const { Id, Name, Description, Icon } = e;
      const skill: Skill = {
        id: Id,
        name: Name,
        description: Description,
        icon: Icon,
      };
      return skill;
    });
    return skills;
  }
  //#endregion mappers
}
