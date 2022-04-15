import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from '@config/app';
import { PrismaModule } from '@providers/postgresql/prisma';

@Global()
@Module({
  imports: [AppConfigModule, PrismaModule],
})
export class CoreModule {}
