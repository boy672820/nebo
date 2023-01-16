import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CryptoModule } from '@utils';
import { JwtConfigModule } from '@config';
import { AuthJwtGuard } from './guards/jwt.guard';
import { AuthJwtStrategy } from './strategy/jwt.strategy';
import { CoreAuthService } from './auth.service';

@Module({
  imports: [JwtConfigModule, CryptoModule],
  providers: [
    CoreAuthService,
    AuthJwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthJwtGuard,
    },
  ],
})
export class CoreAuthModule {}
