import { Controller, Post } from '@nestjs/common';
import { Local } from '@core/decorators/auth';
import { User } from '@core/decorators/auth';
import { LocalPayload } from '@libs/auth';

@Controller('auth')
export class AuthController {
  @Local()
  @Post()
  async signIn(@User() user: LocalPayload) {
    console.log(user);
    return user;
  }
}
