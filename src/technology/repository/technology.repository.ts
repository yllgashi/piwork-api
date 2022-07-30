import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { Technology } from '../model/technology.model';

@Injectable()
export class TechnologyRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Technology> {
    const data = await this.databaseService.execProcedure(
      'Work.usp_Technology_GetAll',
    );
    // if(!data.result) throw
    const technology: Technology = this.mapTechnology(data.result[0]);
    return technology;
  }

  //#region mappers
  private mapTechnology(queryResult: any): Technology {
    const { Id, Name, Description, FieldId, Field } = queryResult;
    const technology: Technology = {
      id: Id,
      name: Name,
      description: Description,
      fieldId: FieldId,
      field: Field,
    };
    return technology;
  }
  //#endregion mappers
}
