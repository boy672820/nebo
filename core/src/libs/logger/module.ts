import { Module } from '@nestjs/common';
import { AppConfigModule } from '@config';
import { provider } from './provider';
import { LoggerService } from './service';

@Module({
  imports: [AppConfigModule],
  providers: [LoggerService, provider],
  exports: [LoggerService],
})
export class LoggerModule {}
