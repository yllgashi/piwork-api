import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { JobApplication } from './model/job-application.model';
import { ApplicationsService } from './applications.service';
import { GetJobApplication } from './model/get-job-application.model';

@ApiBearerAuth()
@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Auth()
  @Get('')
  async getJobApplicationsByUser(
    @CurrentUser('userId') userId: number,
  ): Promise<GetJobApplication[]> {
    return await this.applicationsService.getJobApplicationsByUser(userId);
  }

  @Auth()
  @Get('job/:id')
  async getApplicationsByJobId(
    @Param('id') id: number,
  ): Promise<GetJobApplication[]> {
    return await this.applicationsService.getApplicationsByJobId(id);
  }

  @Auth()
  @Get('/announced')
  async getAnnouncedJobs(
    @CurrentUser('userId') userId: number,
  ): Promise<GetJobApplication[]> {
    return await this.applicationsService.getAnnouncedJobs(userId);
  }

  @Auth()
  @Get('/:id')
  async getJobApplicationDetails(
    @Param('id') id: number,
  ): Promise<GetJobApplication> {
    return await this.applicationsService.getJobApplicationDetails(id);
  }

  @Auth()
  @Post('')
  async createJobApplication(
    @CurrentUser('userId') userId: number,
    @Body() jobApplication: JobApplication,
  ) {
    console.log(jobApplication);
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
  @Post('select-winner-application/:id')
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
