import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { TechnologyController } from './technology.controller';
import { TechnologyRepository } from './technology.repository';
import { TechnologyService } from './technology.service';

@Module({
  imports: [SharedModule],
  controllers: [TechnologyController],
  providers: [TechnologyService, TechnologyRepository]
})
export class TechnologyModule {}
