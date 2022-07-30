import { Body, Controller, Post } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authLogin: Login) {
    return this.authService.login(authLogin);
  }

  @Post('register')
  async register(@Body() authRegister: Register) {
    return this.authService.register(authRegister);
  }
}
