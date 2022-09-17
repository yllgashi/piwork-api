import { Injectable } from '@nestjs/common';
import { MssqlService } from 'src/shared/database/mssql.service';
import { Procedure } from 'src/shared/database/procedures';
import { Login } from './models/login.model';
import { Register } from './models/register.model';
import { TokenInfo } from './models/token-info.model';

@Injectable()
export class AuthRepository {
  constructor(private db: MssqlService) {}
  
  async login(loginUser: Login): Promise<TokenInfo> {
    const { email, password } = loginUser;
    const inputParams = [
      { name: 'email', value: email },
      { name: 'password', value: password },
    ];
    const { result } = await this.db.execProcedure(Procedure.LOGIN, inputParams);
    const userTokenData = this.mapTokenFromLoginAndRegister(result[0]);
    return userTokenData;
  }

  async register(registerUser: Register): Promise<TokenInfo> {
    const { firstName, lastName, email, password, description, roleId } =
      registerUser;
    const inputParams = [
      { name: 'firstName', value: firstName },
      { name: 'lastName', value: lastName },
      { name: 'email', value: email },
      { name: 'description', value: description },
      { name: 'roleId', value: roleId },
      { name: 'password', value: password },
    ];
    const { result } = await this.db.execProcedure(Procedure.REGISTER, inputParams);
    const userTokenData = this.mapTokenFromLoginAndRegister(result[0]);
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
