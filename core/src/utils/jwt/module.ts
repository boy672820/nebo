import { Module } from '@nestjs/common';
import { JwtModule as _JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from '@config/jwt';
import { JwtConfigService } from './config';
import { JwtService } from './service';
import { CryptoModule } from '@utils/crypto';

@Module({
  imports: [
    _JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useClass: JwtConfigService,
    }),
    CryptoModule,
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
