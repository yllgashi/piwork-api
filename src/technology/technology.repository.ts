import { Injectable } from '@nestjs/common';
import { Procedure } from 'src/shared/database/procedures';
import { BaseRepository } from 'src/shared/service/base.repository';
import { Field } from './model/field.model';
import { Technology } from './model/technology.model';

@Injectable()
export class TechnologyRepository extends BaseRepository {
  async getAllTechnologies(): Promise<Technology[]> {
    const { result } = await this.execProc(Procedure.TECHNOLOGY_GET_ALL);
    const technologies: Technology[] = this.mapTechnologies(result);
    return technologies;
  }

  async getAllFields(): Promise<Field[]> {
    const { result } = await this.execProc(Procedure.FIELD_GET_ALL);
    const fields: Field[] = this.mapFields(result);
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
