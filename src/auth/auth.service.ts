import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Login } from './models/login.model';
import { Register } from './models/register.model';
import { User } from './models/user.model';

// This should be a real class/interface representing a user entity

@Injectable()
export class AuthService {
  private readonly users: User[] = [
    {
      id: '1',
      email: 'test1@test.com',
      password: 'changeme',
      roles: ['admin'],
    },
    {
      id: '2',
      email: 'test2@test.com',
      password: 'guess',
      roles: ['client'],
    },
    {
      id: '3',
      email: 'test3@test.com',
      password: 'guess',
      roles: ['client', 'admin'],
    },
  ];

  constructor(private jwtService: JwtService) {}

  //#region Authentication
  async login(loginUser: Login) {
    const user: User = await this.findByEmail(loginUser.email);
    if (!user)
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);

    const jwtData = { userId: user.id, email: user.email, roles: user.roles };

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
      roles: ['client'],
      id: Date.now().toString(),
    });

    if (!user)
      throw new HttpException(
        'User is not created',
        HttpStatus.SERVICE_UNAVAILABLE,
      );

    const jwtData = { userId: user.id, email: user.email, roles: user.roles };

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

  async getUsers(): Promise<User[]> {
    return [...this.users];
  }
}
