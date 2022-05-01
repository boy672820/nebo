import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from '@config/app';
import { PrismaModule } from '@providers/postgresql/prisma';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './exception.filter';
import { PrismaExceptionCatcher } from '@providers/postgresql/prisma/exception.catcher';
import { LoggerModule } from '@libs/logger/module';

@Global()
@Module({
  imports: [AppConfigModule, PrismaModule, LoggerModule],
  providers: [
    PrismaExceptionCatcher,
    {
      provide: APP_FILTER,
      inject: [PrismaExceptionCatcher],
      useClass: AllExceptionFilter,
    },
  ],
  exports: [PrismaModule],
})
export class CoreModule {}
