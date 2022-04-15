import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AuthController } from './controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
