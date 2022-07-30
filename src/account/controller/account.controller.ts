import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { UserExperience } from '../model/user-experience.model';
import { AccountService } from '../service/account.service';

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
}
