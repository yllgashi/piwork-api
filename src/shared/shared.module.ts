import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { BaseRepository } from './service/base.repository';

@Module({
  providers: [DatabaseService, BaseRepository],
  exports: [DatabaseService, BaseRepository],
})
export class SharedModule {}
