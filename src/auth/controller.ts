import { Controller, Post, Req } from '@nestjs/common';
import { Local } from '@core/decorators/auth';

@Controller('auth')
export class AuthController {
  @Local()
  @Post()
  async signIn(@Req() request) {
    return request.user;
  }
}
