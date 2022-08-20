import { Injectable } from '@nestjs/common';
import { Procedure } from 'src/shared/database/procedures';
import { BaseRepository } from 'src/shared/database/base.repository';
import { UserDetails } from './model/user-details.model';
import { UserJob } from './model/user-job.model';
import { Technology } from 'src/technology/model/technology.model';
import { Field } from 'src/technology/model/field.model';
import { Experience } from './model/experience.model';

@Injectable()
export class AccountRepository extends BaseRepository {
  async getUserInfo(userId: any): Promise<UserDetails> {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.execProc(
      Procedure.USER_GET_DETAILS,
      inputParams,
    );
    const userDetails: UserDetails = this.mapUserDetails(result[0]);
    return userDetails;
  }

  async getUserExperience(userId: number): Promise<Experience[]> {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.execProc(
      Procedure.EXPERIENCE_GET_BY_USER_ID,
      inputParams,
    );
    const userExperience: Experience[] = this.mapUserExperience(result);
    return userExperience;
  }

  async createUserExperience(userId: number, experience: Experience) {
    const { workplaceName, description, startDate, endDate } = experience;
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'workplaceName', value: workplaceName },
      { name: 'description', value: description },
      { name: 'startDate', value: startDate },
      { name: 'endDate', value: endDate },
    ];
    const { result } = await this.execProc(
      Procedure.EXPERIENCE_INSERT,
      inputParams,
    );
    return {};
  }

  async deleteUserExperience(id: number) {
    const inputParams = [{ name: 'experienceId', value: id }];
    const { result } = await this.execProc(
      Procedure.EXPERIENCE_DELETE_FOR_USER,
      inputParams,
    );
    return {};
  }

  async getUserFields(userId: number) {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.execProc(
      Procedure.FIELD_GET_BY_USER_ID,
      inputParams,
    );
    const userFields: Field[] = this.mapUserFields(result);
    return userFields;
  }

  async createUserTechnology(userId: number, technologyId: number) {
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'technologyId', value: technologyId },
    ];
    const { result } = await this.execProc(
      Procedure.USER_TECHNOLOGY_INSERT,
      inputParams,
    );
    return {};
  }

  async deleteUserTechnology(userId: number, technologyId: number) {
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'technologyId', value: technologyId },
    ];
    const { result } = await this.execProc(
      Procedure.USER_TECHNOLOGY_DELETE_FOR_USER,
      inputParams,
    );
    return {};
  }

  async getUserTechnologies(userId: number) {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.execProc(
      Procedure.USER_TECHNOLOGY_GET_FOR_USER,
      inputParams,
    );
    const technologies: Technology[] = this.mapUserTechnologies(result);
    return technologies;
  }

  async getUserJobs(userId: number): Promise<UserJob[]> {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.execProc(
      Procedure.JOB_GET_USER_JOBS,
      inputParams,
    );
    const userJobs: UserJob[] = this.mapUserJobs(result);
    return userJobs;
  }

  //#region mappers
  private mapUserExperience(queryResult: any): Experience[] {
    const userExperiences: Experience[] = queryResult.map((e) => {
      const { Id, WorkplaceName, Description, StartDate, EndDate } = e;
      const experience: Experience = {
        id: Id,
        workplaceName: WorkplaceName,
        description: Description,
        startDate: StartDate,
        endDate: EndDate,
      };
      return experience;
    });
    return userExperiences;
  }

  private mapUserFields(queryResult: any): Field[] {
    const userFields: Field[] = queryResult.map((e) => {
      const { Id, Name } = e;
      const field: Field = {
        id: Id,
        name: Name,
      };
      return field;
    });
    return userFields;
  }

  private mapUserTechnologies(queryResult: any): Technology[] {
    const userTechnologies: Technology[] = queryResult.map((e) => {
      const { Id, Name, Description, Icon } = e;
      const technology: Technology = {
        id: Id,
        name: Name,
        description: Description,
        icon: Icon,
      };
      return technology;
    });
    return userTechnologies;
  }

  private mapUserDetails(queryResult: any): UserDetails {
    const {
      Id,
      FirstName,
      LastName,
      Email,
      Description,
      RoleId,
      RoleName,
      IsActive,
      InsertDate,
      ProfilePic,
    } = queryResult;
    const userDetails: UserDetails = {
      id: Id,
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      description: Description,
      roleId: RoleId,
      roleName: RoleName,
      isActive: IsActive,
      insertDate: InsertDate,
      profilePic: ProfilePic,
      experience: null,
      fields: null,
      jobs: null,
      technologies: null,
    };
    return userDetails;
  }

  private mapUserJobs(queryResult: any): UserJob[] {
    const userJobs: UserJob[] = queryResult.map((e) => {
      const {
        JobId,
        JobTitle,
        JobDescription,
        PublisherProfilePic,
        IsActive,
        EmployerComment,
      } = e;
      const userJob: UserJob = {
        jobId: JobId,
        jobTitle: JobTitle,
        jobDescription: JobDescription,
        publisherProfilePic: PublisherProfilePic,
        isActive: IsActive,
        employerComment: EmployerComment,
      };
      return userJob;
    });
    return userJobs;
  }
  //#endregion mappers
}
