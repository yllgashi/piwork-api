import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { Technology } from '../model/technology.model';
import { TechnologyService } from '../service/technology.service';

@ApiBearerAuth()
@ApiTags('technology')
@Controller('technology')
export class TechnologyController {
  constructor(private technologyService: TechnologyService) {}

  @Auth()
  @Get('')
  async register(): Promise<Technology> {
    return await this.technologyService.getAll();
  }
}
