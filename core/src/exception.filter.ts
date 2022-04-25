import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

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
      console.log(exception.code);
    }

    return [HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'];
  }
}
