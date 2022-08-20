import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { SkillsController } from './skills.controller';
import { SkillsRepository } from './skills.repository';
import { SkillsService } from './skills.service';

@Module({
  imports: [SharedModule],
  controllers: [SkillsController],
  providers: [SkillsService, SkillsRepository],
})
export class SkillsModule {}
