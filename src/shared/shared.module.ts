import { Module } from '@nestjs/common';
import { MssqlService } from './database/mssql.service';
import { BaseRepository } from './service/base.repository';

@Module({
  providers: [MssqlService, BaseRepository],
  exports: [MssqlService, BaseRepository],
})
export class SharedModule {}
