import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { TokenInfo } from '../models/token-info.model';

@Injectable()
export class AuthRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async login(loginUser: Login): Promise<TokenInfo> {
    const { email, password } = loginUser;
    const data = await this.databaseService.execProcedure(
      'Administration.usp_User_Login',
      [
        { name: 'email', value: email },
        { name: 'password', value: password },
      ],
    );
    // if(!data.result) throw 
    const userTokenData = this.mapTokenFromLoginAndRegister(data.result[0]);
    return userTokenData;
  }

  async register(registerUser: Register): Promise<TokenInfo> {
    const { firstName, lastName, email, password, description, roleId } =
      registerUser;
    const data = await this.databaseService.execProcedure(
      'Administration.usp_User_Register',
      [
        { name: 'firstName', value: firstName },
        { name: 'lastName', value: lastName },
        { name: 'email', value: email },
        { name: 'description', value: description },
        { name: 'roleId', value: roleId },
        { name: 'password', value: password },
      ],
    );
    // if(!data.result) throw 
    const userTokenData = this.mapTokenFromLoginAndRegister(data.result[0]);
    return userTokenData;
  }

  //#region mappers
  private mapTokenFromLoginAndRegister(data: any): TokenInfo {
    const { Id, FirstName, LastName, Email, Role } = data;
    const tokenInfo: TokenInfo = {
      userId: Id,
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      role: Role,
    };
    return tokenInfo;
  }
  //#endregion mappers
}
