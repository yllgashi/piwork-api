import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/shared/shared.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
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
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
