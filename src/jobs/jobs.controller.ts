import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { JobDetails } from './model/job-details.model';
import { Job } from './model/job.model';
import { JobsService } from './jobs.service';

@ApiBearerAuth()
@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Auth()
  @Get('')
  async getAllJobs(): Promise<Job[]> {
    return await this.jobsService.getAllJobs();
  }

  @Auth()
  @Get('/:id')
  async getJobDetails(@Param('id') id: number): Promise<JobDetails> {
    return await this.jobsService.getJobDetails(id);
  }

  @Auth()
  @Post()
  async createJob(
    @CurrentUser('userId') userId: number,
    @Body() jobDetails: JobDetails,
  ) {
    return await this.jobsService.createJob(userId, jobDetails);
  }

  @Auth()
  @Put()
  async editJob(
    @CurrentUser('userId') userId: number,
    @Body() jobDetails: JobDetails,
  ) {
    return await this.jobsService.editJob(userId, jobDetails);
  }

  @Auth()
  @Put('status/:id')
  async changeJobStatus(
    @CurrentUser('userId') userId: number,
    @Param('id') id: number,
    @Query('active') isactive: boolean,
  ) {
    return await this.jobsService.changeJobStatus(userId, id, isactive);
  }

  @Auth()
  @Get('/field/:id')
  async getJobsByField(@Param('id') id: number) {
    return await this.jobsService.getJobsByField(id);
  }

  @Auth()
  @Get('/technology/:id')
  async getJobsByTechnologyId(@Param('id') id: number) {
    return await this.jobsService.getJobsByTechnology(id);
  }
}
