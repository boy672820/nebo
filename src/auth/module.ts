import { Module } from '@nestjs/common';
import { BaseAuthModule } from '@libs/auth';
import { UserModule } from '../user/module';
import { authService } from './service';

@Module({
  imports: [BaseAuthModule, UserModule],
  providers: [authService],
})
export class AuthModule {}
