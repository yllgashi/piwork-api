import { Injectable } from '@nestjs/common';
import { Skill } from './model/skill.model';
import { SkillsRepository } from './skills.repository';

@Injectable()
export class SkillsService {
  constructor(private skillsRepository: SkillsRepository) {}

  async getAllSkills(): Promise<Skill[]> {
    return await this.skillsRepository.getAllSkills();
  }
}
