import { Module } from '@nestjs/common';
import { AppConfigModule } from '@config';
import { provider } from './logger.providers';
import { LoggerService } from './logger.service';

@Module({
  imports: [AppConfigModule],
  providers: [LoggerService, provider],
  exports: [LoggerService],
})
export class LoggerModule {}
