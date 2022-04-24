import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '@providers/postgresql/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: Prisma.UserCreateInput): Promise<User> {
    const password = await argon2.hash(input.password);
    const newUser = await this.prisma.user.create({
      data: { ...input, password },
    });

    return newUser;
  }
}
