import { Controller, Post } from '@nestjs/common';
import { Local } from '@core/common/decorators/auth';
import { User } from '@core/common/decorators/auth';
import type { LocalPayload } from '@libs/auth';

@Controller('auth')
export class AuthController {
  @Local()
  @Post()
  async signIn(@User() user: LocalPayload) {
    return user;
  }
}
