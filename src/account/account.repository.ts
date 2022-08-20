import { Injectable } from '@nestjs/common';
import { Procedure } from 'src/shared/database/procedures';
import { BaseRepository } from 'src/shared/database/base.repository';
import { UserDetails } from './model/user-details.model';
import { UserJob } from './model/user-job.model';
import { Experience } from './model/experience.model';
import { Skill } from 'src/skills/model/skill.model';

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

  async getUserSkills(userId: any): Promise<Skill[]> {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.execProc(
      Procedure.USER_GET_SKILLS,
      inputParams,
    );
    const skills: Skill[] = this.mapUserSkills(result);
    return skills;
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
      jobs: null,
      skills: null,
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

  private mapUserSkills(queryResult: any): Skill[] {
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
