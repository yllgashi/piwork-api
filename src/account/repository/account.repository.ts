import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { UserExperience } from '../model/user-experience.model';

@Injectable()
export class AccountRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserExperience(userId: number): Promise<UserExperience> {
    const inputParams = [{ name: 'userId', value: userId }];
    const data = await this.databaseService.execProcedure(
      'Work.usp_Experience_GetForUser',
      inputParams,
    );
    const userExperience: UserExperience = this.mapUserExperience(
      data.result[0],
    );
    return userExperience;
  }

  //#region mappers

  private mapUserExperience(queryResult: any): UserExperience {
    const { Id, WorkplaceName, Description, StartDate, EndDate } = queryResult;
    const userExperience: UserExperience = {
      id: Id,
      workplaceName: WorkplaceName,
      description: Description,
      startDate: StartDate,
      endDate: EndDate,
    };
    return userExperience;
  }
  //#endregion mappers
}
