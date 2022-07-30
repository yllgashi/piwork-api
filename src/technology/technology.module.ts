import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { TechnologyController } from './controller/technology.controller';
import { TechnologyRepository } from './repository/technology.repository';
import { TechnologyService } from './service/technology.service';

@Module({
  imports: [SharedModule],
  controllers: [TechnologyController],
  providers: [TechnologyService, TechnologyRepository]
})
export class TechnologyModule {}
