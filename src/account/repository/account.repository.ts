import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { UserExperience } from '../model/user-experience.model';

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

  //#region mappers
  private mapUserExperience(queryResult: any): UserExperience[] {
    let userExperiences: UserExperience[] = queryResult.map((e) => {
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
  //#endregion mappers
}
