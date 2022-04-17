import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AuthController } from './controller';
import { LocalStrategy } from './strategy/local';
import { UserDao } from '@providers/postgresql/dao';

@Module({
  providers: [AuthService, LocalStrategy, UserDao],
  controllers: [AuthController],
})
export class AuthModule {}
