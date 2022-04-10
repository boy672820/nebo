import { Injectable } from '@nestjs/common';
import { AuthServiceFactory } from '@libs/auth';
import { UserService } from '../user/service';
import { User } from '@prisma/client';

@Injectable()
export class authService implements AuthServiceFactory {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.user({ email });

    return user;
  }
}
