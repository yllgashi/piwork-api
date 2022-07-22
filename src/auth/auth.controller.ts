import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { Login } from './models/login.model';
import { Register } from './models/register.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUser: Login) {
    return this.authService.login(loginUser);
  }

  @Post('register')
  async register(@Body() registerUser: Register) {
    return this.authService.register(registerUser);
  }

  @Auth()
  @Get()
  async getUsers(): Promise<any> {
    return this.authService.getUsers();
  }
}
