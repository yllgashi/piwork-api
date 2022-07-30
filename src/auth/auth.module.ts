import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { SharedModule } from 'src/shared/shared.module';
import { AuthController } from './controller/auth.controller';
import { AuthRepository } from './repository/auth.repository';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  imports: [
    SharedModule,
    PassportModule,
    JwtModule.register({
      // secret: `${process.env.JWT_SECRET_KEY}`,
      secret: 'secret',
      signOptions: { expiresIn: '120000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy],
})
export class AuthModule {}
