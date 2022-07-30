import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  private readonly users: User[] = [
    {
      id: '1',
      email: 'yll@gashi.com',
      role: 'Admin',
      firstName: 'Yll',
      lastName: 'Gashi',
      password: 'Test123',
    },
    {
      id: '2',
      email: 'test@test.com',
      role: 'Client',
      firstName: 'Yll',
      lastName: 'Gashi',
      password: 'Test123',
    },
  ];

  constructor(private jwtService: JwtService) {}

  //#region Authentication
  async login(loginUser: Login) {
    const user: User = await this.findByEmail(loginUser.email);
    if (!user)
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
    const jwtData: Token = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(jwtData),
    };
  }

  async register(registerUser: Register) {
    const userExists: User = await this.findByEmail(registerUser.email);
    if (userExists)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const user: User = await this.createUser({
      email: registerUser.email,
      password: registerUser.password,
      id: Date.now().toString(),
      role: 'client',
      firstName: registerUser.firstName,
      lastName: registerUser.lastName,
    });

    if (!user)
      throw new HttpException(
        'User is not created',
        HttpStatus.SERVICE_UNAVAILABLE,
      );

    const jwtData: Token = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(jwtData),
    };
  }
  //#endregion

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
