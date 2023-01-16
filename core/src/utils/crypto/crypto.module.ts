import { Module } from '@nestjs/common';
import { CryptoConfigModule } from '@config/crypto';
import { CryptoService } from './crypto.service';
import { key } from './crypto.providers';

@Module({
  imports: [CryptoConfigModule],
  providers: [CryptoService, key],
  exports: [CryptoService],
})
export class CryptoModule {}
