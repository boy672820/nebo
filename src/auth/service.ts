import { Injectable } from '@nestjs/common';
import { AuthServiceFactory } from '@libs/auth';
import { User } from '@prisma/client';
import { UserDao } from '@providers/postgresql/dao';

@Injectable()
export class AuthService implements AuthServiceFactory {
  constructor(private readonly userDao: UserDao) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userDao.user({ email });

    return user;
  }
}
