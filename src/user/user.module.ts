import { Module } from '@nestjs/common';
import { JwtModule } from '@utils';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [JwtModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
