import { Module } from '@nestjs/common';
import { MssqlService } from './database/mssql.service';

@Module({
  providers: [MssqlService],
  exports: [MssqlService],
})
export class SharedModule {}
