import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { TokenInfo } from '../models/token-info.model';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  async login(loginUser: Login) {
    const tokenInfo: TokenInfo = await this.authRepository.login(loginUser);
    return {
      access_token: this.jwtService.sign(tokenInfo),
    };
  }

  async register(registerUser: Register) {
    const tokenInfo: TokenInfo = await this.authRepository.register(
      registerUser,
    );
    return {
      access_token: this.jwtService.sign(tokenInfo),
    };
  }
}
