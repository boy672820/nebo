import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [LocalStrategy],
  exports: [LocalStrategy],
})
export class BaseAuthModule {}
