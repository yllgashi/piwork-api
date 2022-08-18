import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AccountService } from './account.service';
import { UserDetails } from './model/user-details.model';
import { UserExperience } from './model/user-experience.model';

@ApiBearerAuth()
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Auth()
  @Get('/:id')
  async getAccountDetails(@Param('id') id: number): Promise<UserDetails> {
    return await this.accountService.getUserDetails(id);
  }

  @Auth()
  @Get('/:userId/experience')
  async getUserExperience(
    @Param('userId') userId: number,
  ): Promise<UserExperience[]> {
    return await this.accountService.getUserExperience(userId);
  }

  @Auth()
  @Post('experience')
  async createUserExperience(
    @CurrentUser('userId') userId: number,
    @Body() experience: UserExperience,
  ) {
    return await this.accountService.createUserExperience(userId, experience);
  }

  @Auth()
  @Delete('experience/:id')
  async deleteUserExperience(@Param('id') id: number) {
    return await this.accountService.deleteUserExperience(id);
  }

  @Auth()
  @Get('/:userId/fields')
  async getUserFields(@Param('userId') userId: number) {
    return await this.accountService.getUserFields(userId);
  }

  @Auth()
  @Post('technologies/:id')
  async createUserTechnology(
    @CurrentUser('userId') userId: number,
    @Param('id') id: number,
  ) {
    return await this.accountService.createUserTechnology(userId, id);
  }

  @Auth()
  @Delete('technologies/:id')
  async deleteUserTechnology(
    @CurrentUser('userId') userId: number,
    @Param('id') id: number,
  ) {
    return await this.accountService.deleteUserTechnology(userId, id);
  }

  @Auth()
  @Get('/:userId/technologies')
  async getUserTechnologies(@Param('userId') userId: number) {
    return await this.accountService.getUserTechnologies(userId);
  }

  @Auth()
  @Get('/:userId/jobs')
  async getUserJobs(@Param('userId') userId: number) {
    return await this.accountService.getUserJobs(userId);
  }
}
