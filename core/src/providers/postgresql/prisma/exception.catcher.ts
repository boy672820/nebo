import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AlreadyExistsEmailException } from '@errors/user';

@Injectable()
export class PrismaExceptionCatcher {
  transformException(
    exception: Prisma.PrismaClientKnownRequestError,
  ): [number, string] {
    let error = new InternalServerErrorException();

    const meta = exception?.meta['target'] as any;

    if (exception.code === 'P2002' && meta.includes('email')) {
      error = new AlreadyExistsEmailException();
    }

    return [error.getStatus(), error.message];
  }
}
