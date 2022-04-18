import { Module } from '@nestjs/common';
import { UserController } from './controller';
import { UserService } from './service';
import { UserDao } from '@providers/postgresql/dao';

@Module({
  providers: [UserService, UserDao],
  controllers: [UserController],
})
export class UserModule {}
