import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [SharedModule],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}