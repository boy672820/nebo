import { Module } from '@nestjs/common';
import { provider } from './provider';
import { LoggerService } from './service';

@Module({
  providers: [LoggerService, provider],
  exports: [LoggerService],
})
export class LoggerModule {}
