import { Module } from '@nestjs/common';
import { BaseAuthModule } from '@libs/auth';
import { AuthService } from './service';
import { AuthController } from './controller';

@Module({
  imports: [BaseAuthModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
