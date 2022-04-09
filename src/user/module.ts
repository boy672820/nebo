import { Module } from '@nestjs/common';
import { PrismaModule } from '@providers/postgresql';
import { UserController } from './controller';
import { UserService } from './service';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
