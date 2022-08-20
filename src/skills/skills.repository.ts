import { BaseRepository } from 'src/shared/database/base.repository';
import { Procedure } from 'src/shared/database/procedures';
import { Skill } from './model/skill.model';

export class SkillsRepository extends BaseRepository {
  async getAllSkills(): Promise<Skill[]> {
    const { result } = await this.execProc(Procedure.SKILLS_GET_ALL);
    const skills: Skill[] = this.mapSkills(result);
    return skills;
  }

  private mapSkills(queryResult: any): Skill[] {
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
}
