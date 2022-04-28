import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaExceptionCatcher {
  constructor(
    private readonly exception: Prisma.PrismaClientKnownRequestError,
  ) {}
}
