import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { JobDetails } from './model/job-details.model';
import { Job } from './model/job.model';
import { JobsService } from './jobs.service';
import { JobCreate } from './model/job-create.model';

@ApiBearerAuth()
@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get('')
  async getAllJobs(): Promise<Job[]> {
    return await this.jobsService.getAllJobs();
  }

  @Auth()
  @Get('/announced')
  async getAnnouncedJobs(
    @CurrentUser('userId') userId: number,
  ): Promise<Job[]> {
    return await this.jobsService.getAnnouncedJobs(userId);
  }

  @Auth()
  @Get('/filter?')
  async filterJobs(
    @Query('title') title: string,
    @Query('skillId') skillId: number,
  ): Promise<Job[]> {
    return await this.jobsService.filterJobs(title, skillId);
  }

  @Auth()
  @Get('/:id')
  async getJobDetails(
    @Param('id') id: number,
    @CurrentUser('userId') userId: number,
  ): Promise<JobDetails> {
    return await this.jobsService.getJobDetails(id, userId);
  }

  @Auth()
  @Post()
  async createJob(
    @CurrentUser('userId') userId: number,
    @Body() jobCreate: JobCreate,
  ) {
    console.log(jobCreate);
    return await this.jobsService.createJob(userId, jobCreate);
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
  @Get('/skill/:id')
  async getJobsBySkill(@Param('id') id: number) {
    return await this.jobsService.getJobsBySkill(id);
  }
}
