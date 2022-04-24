import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from '@config/app';
import { PrismaModule } from '@providers/postgresql/prisma';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './exception.filter';

@Global()
@Module({
  imports: [AppConfigModule, PrismaModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
  exports: [PrismaModule],
})
export class CoreModule {}
