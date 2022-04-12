import { Injectable } from '@nestjs/common';
import { AuthServiceFactory } from '@libs/auth';
import { User } from '@prisma/client';

@Injectable()
export class AuthService implements AuthServiceFactory {
  async validateUser(email: string, password: string): Promise<User> {
    return {
      id: 1,
      email,
      name: null,
      password,
    };
  }
}
