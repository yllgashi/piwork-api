import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  @Get('')
  async test() {
    return 'Hello';
  }
}
