import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PrismaModule } from '@providers/postgresql/prisma';
import { PrismaExceptionCatcher } from '@providers/postgresql/prisma/exception.catcher';
import { LoggerModule } from '@core/libs/logger/logger.module';
import { AppConfigModule } from '@config';
import { AllExceptionFilter } from './exception.filter';
import { CoreAuthModule } from './authentication';

@Global()
@Module({
  imports: [AppConfigModule, PrismaModule, CoreAuthModule, LoggerModule],
  providers: [
    PrismaExceptionCatcher,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
  exports: [PrismaModule],
})
export class CoreModule {}
