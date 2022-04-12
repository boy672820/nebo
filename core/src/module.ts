import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from '@config/app';
import { PrismaModule } from './providers/postgresql';

@Global()
@Module({
  imports: [AppConfigModule, PrismaModule],
  providers: [],
  exports: [PrismaModule],
})
export class CoreModule {}
