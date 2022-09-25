import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AlreadyExistsEmailException } from '@core/common/errors/user';

@Injectable()
export class PrismaExceptionCatcher {
  transformException(exception: Prisma.PrismaClientKnownRequestError) {
    const meta = exception?.meta['target'] as any;

    if (exception.code === 'P2002') {
      if (meta.includes(Prisma.UserScalarFieldEnum.email)) {
        return new AlreadyExistsEmailException();
      }
    }

    return new InternalServerErrorException();
  }
}
