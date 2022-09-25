import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { PrismaExceptionCatcher } from '@providers/postgresql/prisma/exception.catcher';
import { LoggerService } from '@libs/logger';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  constructor(
    protected readonly httpAdapterHost: HttpAdapterHost,
    protected readonly prismaExceptionCatcher: PrismaExceptionCatcher,
    protected readonly logger: LoggerService,
  ) {
    super();
  }

  // -----------------------------------------------------------------------------

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      this.logger.error(exception.message, exception?.stack, 'database');

      super.catch(
        this.prismaExceptionCatcher.transformException(exception),
        host,
      );
      return;
    }

    if (exception instanceof HttpException) {
      this.logger.error(exception.message, exception?.stack, exception?.name);
    }

    super.catch(exception, host);
  }
}
