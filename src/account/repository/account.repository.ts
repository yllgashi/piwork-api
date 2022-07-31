import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { UserExperience } from '../model/user-experience.model';
import { UserField } from '../model/user-field.model';
import { UserTechnology } from '../model/user-technology.model';

@Injectable()
export class AccountRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserExperience(userId: number): Promise<UserExperience[]> {
    const inputParams = [{ name: 'userId', value: userId }];
    const data = await this.databaseService.execProcedure(
      'Work.usp_Experience_GetForUser',
      inputParams,
    );
    const userExperience: UserExperience[] = this.mapUserExperience(
      data.result,
    );
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
    const data = await this.databaseService.execProcedure(
      'Work.usp_Experience_Insert',
      inputParams,
    );
    return {};
  }

  async deleteUserExperience(id: number) {
    const inputParams = [{ name: 'experienceId', value: id }];
    const data = await this.databaseService.execProcedure(
      'Work.usp_Experience_DeleteForUser',
      inputParams,
    );
    return {};
  }

  async getUserFields(userId: number) {
    const inputParams = [{ name: 'userId', value: userId }];
    const data = await this.databaseService.execProcedure(
      'Work.usp_Field_GetForUser',
      inputParams,
    );
    const userFields: UserField[] = this.mapUserFields(data.result);
    return userFields;
  }

  async createUserTechnology(userId: number, technologyId: number) {
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'technologyId', value: technologyId },
    ];
    const data = await this.databaseService.execProcedure(
      'Work.usp_UserTechnology_Insert',
      inputParams,
    );
    return {};
  }

  async deleteUserTechnology(userId: number, technologyId: number) {
    const inputParams = [
      { name: 'userId', value: userId },
      { name: 'technologyId', value: technologyId },
    ];
    const data = await this.databaseService.execProcedure(
      'Work.usp_UserTechnology_DeleteForUser',
      inputParams,
    );
    return {};
  }

  async getUserTechnologies(userId: number) {
    const inputParams = [{ name: 'userId', value: userId }];
    const data = await this.databaseService.execProcedure(
      'Work.usp_UserTechnology_GetForUser',
      inputParams,
    );
    const userTechnologies: UserTechnology[] = this.mapUserTechnologies(
      data.result,
    );
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
