import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AccountController } from './controller/account.controller';
import { AccountRepository } from './repository/account.repository';
import { AccountService } from './service/account.service';

@Module({
  imports: [SharedModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
