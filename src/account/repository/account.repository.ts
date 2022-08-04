import { Injectable } from '@nestjs/common';
import { Procedure } from 'src/shared/database/procedures';
import { BaseRepository } from 'src/shared/service/base.repository';
import { UserExperience } from '../model/user-experience.model';
import { UserField } from '../model/user-field.model';
import { UserTechnology } from '../model/user-technology.model';

@Injectable()
export class AccountRepository extends BaseRepository {
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
      const { Id, TechnologyId, TechnologyName } = e;
      const technology: UserTechnology = {
        id: Id,
        technologyId: TechnologyId,
        technologyName: TechnologyName,
      };
      return technology;
    });
    return userTechnologies;
  }
  //#endregion mappers
}
