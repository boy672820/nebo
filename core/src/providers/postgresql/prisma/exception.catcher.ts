import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AlreadyExistsEmailException } from '@errors/user';

@Injectable()
export class PrismaExceptionCatcher {
  transformException(
    exception: Prisma.PrismaClientKnownRequestError,
  ): [number, string] {
    let error = new InternalServerErrorException();

    if (
      exception.code === 'P2002' &&
      exception?.meta['target'].includes('email')
    ) {
      error = this.throwAlreadyExistsEmail();
    }

    return [error.getStatus(), error.message];
  }

  throwAlreadyExistsEmail() {
    return new AlreadyExistsEmailException();
  }
}
