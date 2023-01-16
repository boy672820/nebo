import { Injectable } from '@nestjs/common';
import { PrismaService } from '@providers/postgresql/prisma';
import { AuthResult, AuthServiceFactory } from '@libs';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService implements AuthServiceFactory {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<AuthResult> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { userId: true, email: true, name: true, password: true },
    });

    if (!user) {
      return null;
    }

    const isPassword = await argon2.verify(user.password, password);

    if (!isPassword) {
      return null;
    }

    delete user.password;
    return user;
  }
}
