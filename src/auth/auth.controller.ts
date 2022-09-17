import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Login } from './models/login.model';
import { Register } from './models/register.model';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authLogin: Login) {
    return await this.authService.login(authLogin);
  }

  @Post('register')
  async register(@Body() authRegister: Register) {
    return await this.authService.register(authRegister);
  }
}
