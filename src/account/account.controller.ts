import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AccountService } from './account.service';
import { Experience } from './model/experience.model';
import { UserDetails } from './model/user-details.model';

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
  ): Promise<Experience[]> {
    return await this.accountService.getUserExperience(userId);
  }

  @Auth()
  @Post('experience')
  async createUserExperience(
    @CurrentUser('userId') userId: number,
    @Body() experience: Experience,
  ) {
    return await this.accountService.createUserExperience(userId, experience);
  }

  @Auth()
  @Delete('experience/:id')
  async deleteUserExperience(@Param('id') id: number) {
    return await this.accountService.deleteUserExperience(id);
  }

  @Auth()
  @Get('/:userId/jobs')
  async getUserJobs(@Param('userId') userId: number) {
    return await this.accountService.getUserJobs(userId);
  }
}
