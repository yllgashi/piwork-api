import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { Skill } from './model/skill.model';
import { SkillsService } from './skills.service';

@ApiBearerAuth()
@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Auth()
  @Get('')
  async getAllSkills(): Promise<Skill[]> {
    return await this.skillsService.getAllSkills();
  }
}
