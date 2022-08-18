import { Injectable } from '@nestjs/common';
import { Procedure } from 'src/shared/database/procedures';
import { BaseRepository } from 'src/shared/database/base.repository';
import { UserExperience } from './model/user-experience.model';
import { UserField } from './model/user-field.model';
import { UserTechnology } from './model/user-technology.model';
import { UserDetails } from './model/user-details.model';
import { UserJob } from './model/user-job.model';

@Injectable()
export class AccountRepository extends BaseRepository {
  async getUserDetails(userId: any): Promise<UserDetails> {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.execProc(
      Procedure.USER_GET_DETAILS,
      inputParams,
    );
    const userDetails: UserDetails = this.mapUserDetails(result[0]);
    return userDetails;
  }

  async getUserExperience(userId: number): Promise<UserExperience[]> {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.execProc(
      Procedure.EXPERIENCE_GET_BY_USER_ID,
      inputParams,
    );
    const userExperience: UserExperience[] = this.mapUserExperience(result);
    return userExperience;
  }

  async createUserExperience(userId: number, experience: UserExperience) {
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
    const userFields: UserField[] = this.mapUserFields(result);
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
    const userTechnologies: UserTechnology[] = this.mapUserTechnologies(result);
    return userTechnologies;
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
  private mapUserExperience(queryResult: any): UserExperience[] {
    const userExperiences: UserExperience[] = queryResult.map((e) => {
      const { Id, WorkplaceName, Description, StartDate, EndDate } = e;
      const experience: UserExperience = {
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

  private mapUserFields(queryResult: any): UserField[] {
    const userFields: UserField[] = queryResult.map((e) => {
      const { Id, Name } = e;
      const field: UserField = {
        id: Id,
        name: Name,
      };
      return field;
    });
    return userFields;
  }

  private mapUserTechnologies(queryResult: any): UserTechnology[] {
    const userTechnologies: UserTechnology[] = queryResult.map((e) => {
      const { Id, TechnologyId, TechnologyName, TechnologyIcon } = e;
      const technology: UserTechnology = {
        id: Id,
        technologyId: TechnologyId,
        technologyName: TechnologyName,
        technologyIcon: TechnologyIcon,
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
    };
    return userDetails;
  }

  private mapUserJobs(queryResult: any): UserJob[] {
    const userJobs: UserJob[] = queryResult.map((e) => {
      const {
        JobId,
        JobTitle,
        JobDescription,
        JobPicture,
        IsActive,
        EmployerComment,
      } = e;
      const userJob: UserJob = {
        jobId: JobId,
        jobTitle: JobTitle,
        jobDescription: JobDescription,
        jobPicture: JobPicture,
        isActive: IsActive,
        employerComment: EmployerComment,
      };
      return userJob;
    });
    return userJobs;
  }
  //#endregion mappers
}
