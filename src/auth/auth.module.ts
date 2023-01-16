import { Module } from '@nestjs/common';
import { JwtModule } from '@utils';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [JwtModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
