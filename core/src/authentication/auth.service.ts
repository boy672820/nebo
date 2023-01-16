import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@providers/postgresql/prisma';
import { JWTUserPayload } from './auth.types';

@Injectable()
export class CoreAuthService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 인증 정보 조회
   * @param where 조회 조건
   * @returns 인증 정보
   */
  user(where: Prisma.UserWhereUniqueInput): Promise<JWTUserPayload> {
    return this.prisma.user.findUnique({
      where,
    });
  }
}
