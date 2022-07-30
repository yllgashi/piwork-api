import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  //#region Authentication
  async login(loginUser: Login) {
    const tokenInfo: TokenInfo = await this.authRepository.login(loginUser);
    if (!tokenInfo)
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
    return {
      access_token: this.jwtService.sign(tokenInfo),
    };
  }

  async register(registerUser: Register) {
    const tokenInfo: TokenInfo = await this.authRepository.register(
      registerUser,
    );
    if (!tokenInfo)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    return {
      access_token: this.jwtService.sign(tokenInfo),
    };
  }
  //#endregion
}
