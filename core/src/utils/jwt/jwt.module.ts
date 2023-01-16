import { Module } from '@nestjs/common';
import { JwtModule as _JwtModule } from '@nestjs/jwt';
import { JwtConfigModule, CryptoConfigModule } from '@config';
import { JwtConfigService } from './jwt.config.service';
import { JwtService } from './jwt.service';
import { CryptoService } from './crypto.service';
import { key } from './jwt.providers';

@Module({
  imports: [
    CryptoConfigModule,
    _JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useClass: JwtConfigService,
    }),
  ],
  providers: [JwtService, CryptoService, key],
  exports: [JwtService],
})
export class JwtModule {}
