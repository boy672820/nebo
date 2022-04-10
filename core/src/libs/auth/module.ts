import { Module } from '@nestjs/common';
import { CryptoModule } from '@utils/crypto';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [CryptoModule],
  providers: [LocalStrategy],
  exports: [LocalStrategy],
})
export class BaseAuthModule {}
