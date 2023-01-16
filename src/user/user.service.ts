import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@providers/postgresql/prisma';
import { AuthResult } from '@libs';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: Prisma.UserCreateInput): Promise<AuthResult> {
    const password = await argon2.hash(input.password);
    const newUser = await this.prisma.user.create({
      data: { ...input, password },
      select: { userId: true, email: true, name: true },
    });

    return newUser;
  }

  user(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }): Promise<User> {
    return this.prisma.user.findUnique(params);
  }
}
