import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { JobApplication } from './model/job-application.model';
import { ApplicationsService } from './applications.service';

@ApiBearerAuth()
@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Auth()
  @Get('')
  async getJobApplicationsByUser(@CurrentUser('userId') userId: number) {
    return await this.applicationsService.getJobApplicationsByUser(userId);
  }

  @Auth()
  @Post('')
  async createJobApplication(
    @CurrentUser('userId') userId: number,
    @Body() jobApplication: JobApplication,
  ) {
    return await this.applicationsService.createJobApplication(
      userId,
      jobApplication,
    );
  }

  @Auth()
  @Delete('/:id')
  async deleteJobApplication(
    @CurrentUser('userId') userId: number,
    @Param('id') id: number,
  ) {
    return await this.applicationsService.deleteJobApplication(userId, id);
  }

  @Auth()
  @Post('/:id')
  async chooseJobApplicationWinner(
    @CurrentUser('userId') userId: number,
    @Param('id') id: number,
  ) {
    return await this.applicationsService.chooseJobApplicationWinner(
      userId,
      id,
    );
  }
}
