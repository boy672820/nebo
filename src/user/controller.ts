import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Post('test')
  async test() {
    return 'test';
  }
}
