import { Controller } from '@nestjs/common';
import { AuthSign, Local, Public, User } from '@core/common/decorators/auth';
import { Post } from '@core/common/decorators';
import { AuthResult } from '@libs';

@Controller('auth')
export class AuthController {
  @Public()
  @Local()
  @AuthSign()
  @Post({ summary: 'Sign In' })
  signIn(@User() user: AuthResult): AuthResult {
    return user;
  }
}
