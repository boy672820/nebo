import { Module } from '@nestjs/common';
import { PrismaService } from '@core/providers/prisma/service';
import { UserController } from './controller';
import { UserService } from './service';

@Module({
  providers: [PrismaService, UserService],
  controllers: [UserController],
})
export class UserModule {}
