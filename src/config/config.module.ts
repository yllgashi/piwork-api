import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { ConfigController } from './controller/config.controller';
import { ConfigRepository } from './repository/config.repository';
import { ConfigService } from './service/config.service';

@Module({
  imports: [SharedModule],
  controllers: [ConfigController],
  providers: [ConfigService, ConfigRepository],
})
export class ConfigModule {}
