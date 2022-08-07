import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { Field } from './model/field.model';
import { Technology } from './model/technology.model';
import { TechnologyService } from './technology.service';

@ApiBearerAuth()
@ApiTags('technology')
@Controller('technology')
export class TechnologyController {
  constructor(private technologyService: TechnologyService) {}

  @Auth()
  @Get('')
  async getAllTechnologies(): Promise<Technology[]> {
    return await this.technologyService.getAllTechnologies();
  }

  @Auth()
  @Get('fields')
  async getAllFields(): Promise<Field[]> {
    return await this.technologyService.getAllFields();
  }
}
