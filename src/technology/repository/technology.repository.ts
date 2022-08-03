import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { Procedure } from 'src/shared/database/procedures';
import { Field } from '../model/field.model';
import { Technology } from '../model/technology.model';

@Injectable()
export class TechnologyRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllTechnologies(): Promise<Technology[]> {
    const data = await this.databaseService.execProcedure(
      Procedure.TECHNOLOGY_GET_ALL,
    );
    // if(!data.result) throw
    const technologies: Technology[] = this.mapTechnologies(data.result);
    return technologies;
  }

  async getAllFields(): Promise<Field[]> {
    const data = await this.databaseService.execProcedure(
      Procedure.FIELD_GET_ALL,
    );
    // if(!data.result) throw
    const fields: Field[] = this.mapFields(data.result);
    return fields;
  }

  //#region mappers
  private mapTechnologies(queryResult: any): Technology[] {
    const technologies: Technology[] = queryResult.map((e) => {
      const { Id, Name, Description, FieldId, Field } = e;
      const technology: Technology = {
        id: Id,
        name: Name,
        description: Description,
        fieldId: FieldId,
        field: Field,
      };
      return technology;
    });
    return technologies;
  }

  private mapFields(queryResult: any): Field[] {
    const fields: Field[] = queryResult.map((e) => {
      const { Id, Name } = e;
      const field: Field = {
        id: Id,
        name: Name,
      };
      return field;
    });
    return fields;
  }
  //#endregion mappers
}
