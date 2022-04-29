import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { PrismaExceptionCatcher } from '@providers/postgresql/prisma/exception.catcher';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly prismaExceptionCatcher: PrismaExceptionCatcher,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const [httpStatus, message] = this.transformException(exception);

    const responseBody = {
      statusCode: httpStatus,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  transformException(exception: unknown): [number, string] {
    if (exception instanceof HttpException) {
      return [exception.getStatus(), exception.message];
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.prismaExceptionCatcher.transformException(exception);
    }

    return [HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'];
  }
}
