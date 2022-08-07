import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AccountService } from './account.service';
import { UserExperience } from './model/user-experience.model';

@ApiBearerAuth()
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Auth()
  @Get('experience')
  async getUserExperience(
    @CurrentUser('userId') userId: number,
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
  @Get('fields')
  async getUserFields(@CurrentUser('userId') userId: number) {
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
  @Get('technologies')
  async getUserTechnologies(@CurrentUser('userId') userId: number) {
    return await this.accountService.getUserTechnologies(userId);
  }
}
