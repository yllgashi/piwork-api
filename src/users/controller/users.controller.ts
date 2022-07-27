import { Body, Controller, Get, Post } from '@nestjs/common';

import { Auth } from 'src/shared/decorators/auth.decorator';
import { UsersService } from '../service/users.service';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() authLogin: Login) {
    return this.usersService.login(authLogin);
  }

  @Post('register')
  async register(@Body() authRegister: Register) {
    return this.usersService.register(authRegister);
  }

  @Auth('admin')
  @Get()
  async getUsers(): Promise<any> {
    return this.usersService.getUsers();
  }
}
