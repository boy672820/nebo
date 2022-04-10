import { Module } from '@nestjs/common';
import { CryptoConfigModule } from '@config/crypto';
import { CryptoService } from './service';
import { key } from './provider';

@Module({
  imports: [CryptoConfigModule],
  providers: [CryptoService, key],
  exports: [CryptoService],
})
export class CryptoModule {}
